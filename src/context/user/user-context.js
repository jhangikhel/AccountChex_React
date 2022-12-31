import React, { useEffect, useState } from 'react';
import httpService from '../../API/HttpService/httpService';
import { API_PATH } from '../../Constants/config';
import { checkValidity } from "./../../Shared/index";
const initialUserState = {
    account: null,
    userName: "",
    firstName: "",
    lastName: "",
    primaryPhone: "",
    secondaryPhone: "",
    email: "",
    confirmEmail: "",
    role: null,
    userLock: 0,
    country: null,
}
const errorUserState = {
    account: {
        errorObject: {
            required: true,
            isValid: true,
            errorMessage: "",
            isDropdown: true,
        },
    },
    country: {
        errorObject: {
            required: true,
            isValid: true,
            errorMessage: "",
            isDropdown: true,
        },
    },
    role: {
        errorObject: {
            required: true,
            isValid: true,
            errorMessage: "",
            isDropdown: true,
        },
    },
    userName: {
        errorObject: {
            required: true,
            isValid: true,
            minLength: 6,
            errorMessage: "",
        },
    },
    firstName: {
        errorObject: { required: true, errorMessage: "", isValid: true },
    },
    lastName: {
        errorObject: { required: true, errorMessage: "", isValid: true },
    },
    email: {
        errorObject: { required: true, errorMessage: "", isValid: true, isEmail: true },
    },
    confirmEmail: {
        errorObject: { required: true, errorMessage: "", isValid: true, isEmail: true },
    },
    primaryPhone: {
        errorObject: {
            required: true,
            isValid: true,
            isNumeric: true,
            minLength: 5,
            errorMessage: "",
        },
    },
    secondaryPhone: {
        errorObject: {
            required: false,
            isNumeric: true,
            minLength: 0,
            errorMessage: "",
            isValid: true,
        },
    },
};
const UserContext = React.createContext({
    userObj: initialUserState,
    isLoading: false,
    accounts: [],
    roles: [],
    countries: []
});


export const UserContextProvider = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [countries, setCountries] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [stateObj, setError] = useState({
        error: errorUserState,
        account: initialUserState
    });
    const onDropdownChangeHandler = (cntrlName, value) => {
        const { error, account } = stateObj;
        const validationObj = error[cntrlName];
        const id = value === null ? 0 : value.id;

        const { errorObject } = checkValidity(id, cntrlName, validationObj);

        setError({
            ...stateObj,
            error: { ...error, [cntrlName]: { errorObject } },
            account: { ...account, [cntrlName]: value },
        });
    };
    const changeHandler = (e) => {
        const { value, name } = e.target;
        const { error, account } = stateObj;
        const validationObj = error[name];

        let { errorObject } = checkValidity(value, name, validationObj);

        if (errorObject.errorMessage === "" && name === "confirmEmail" && value.toLowerCase() !== account.email.toLowerCase()) {
            errorObject = { ...errorObject, errorMessage: "Confirm Email Id must match Email ID ", isValid: false }
        }
        if (errorObject.errorMessage === "" && name === "email") {
            let errorObjectconfirmEmail = { ...errorObject, errorMessage: "", isValid: true };
            if (value.toLowerCase() !== account.confirmEmail.toLowerCase()) {
                errorObjectconfirmEmail = { ...errorObject, errorMessage: "Confirm Email Id must match Email ID ", isValid: false }
            }
            setError({
                ...stateObj,
                error: { ...error, confirmEmail: { errorObject: { ...errorObjectconfirmEmail } }, [name]: { errorObject } },
                account: { ...account, [name]: value },
            });
        } else {
            setError({
                ...stateObj,
                error: { ...error, [name]: { errorObject } },
                account: { ...account, [name]: value },
            });
        }
    };
    const onSubmitHandler = () => {
        const { error, account } = stateObj;
        let result = true;
        for (let err in error) {
            const value = account[err];
            const name = err;

            const validationObj = error[name];

            const { errorObject } = checkValidity(value, name, validationObj);
            console.log(errorObject.errorMessage, name, stateObj);
            if (errorObject.errorMessage !== "") {
                result = false;
            }

            error[name] = { errorObject };
        }

        setError({ account, error: error });

        if (result === true) {
         
        }
    };
    const changeHandlerRadioBtn = (_e, value) => {
        const { account } = stateObj;

        setError({
            ...stateObj,
            account: { ...account, userLock: +value },
        });
    };
    useEffect(() => {
        setIsLoading(true);
        httpService.all([
            httpService.get(API_PATH.GET_COUNTRY),
            httpService.get(API_PATH.GET_PARENTACCOUNT),
        ]).then((responses) => {
            const [countries, accounts] = responses;
            setCountries(countries.data);
            setAccounts(accounts.data);
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);
    return <UserContext.Provider value={{
        isLoading,
        countries,
        accounts,
        onDropdownChangeHandler,
        stateObj,
        changeHandler,
        changeHandlerRadioBtn,
        onSubmitHandler
    }}>{props.children}</UserContext.Provider>


}
export default UserContext;