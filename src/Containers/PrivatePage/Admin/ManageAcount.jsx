import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { TextField, Button, Box, Radio, RadioGroup, FormControlLabel, FormLabel } from "@material-ui/core";
import { checkValidity, fillTemplate } from "./../../../Shared/index";
import { Autocomplete } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import { snackbarMessages } from "../../../Constants/errorMessage";
import { API_PATH } from "../../../Constants/config";
import CustomizedSnackbars from './../../../Components/CustomizedSnackbars';
import NumberFormatCustom from "../../../Components/Forms/NumericInput";
import httpService from "../../../API/HttpService/httpService";
import LoadingPage from "../../../Components/Control/LoadingPage";




const ManageAccount = () => {

    const history = useHistory();
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [snackbar, setSnackbar] = React.useState(false);
    const [vendors, setVendors] = useState([]);
    const [accountManagers, setAccountManagers] = useState([]);
    const [clients, setClients] = useState([]);
    const [message, setMessage] = React.useState(snackbarMessages.createSuccess);
    const [currencies, setCurrencies] = useState([]);
    const [accountTypes, setAccountTypes] = useState([]);
    const [organiztionTypes, setOrganiztionTypes] = useState([]);
    const [frequencies, setFrequencies] = useState([]);
    const [parentAccounts, setParentAccounts] = useState([]);
    const [billingDates, setBillingDates] = useState([]);
    const [stateObj, setError] = useState({
        error: {
            accountName: {
                errorObject: { required: true, errorMessage: "", isValid: true },
            },
            taxId: {
                errorObject: { required: true, errorMessage: "", isValid: true },
            },
            billingContactNumber: {
                errorObject: { required: true, errorMessage: "", isValid: true },
            },
            billingAddress: {
                errorObject: { required: true, errorMessage: "", isValid: true },
            },
            billingPrimayEmail: {
                errorObject: { required: true, errorMessage: "", isValid: true },
            },
            billingSecondaryEmail: {
                errorObject: { required: true, errorMessage: "", isValid: true },
            },
            parentAccount: {
                errorObject: {
                    required: true,
                    isValid: true,
                    errorMessage: "",
                    isDropdown: true,
                },
            },
            accountType: {
                errorObject: {
                    required: true,
                    isValid: true,
                    errorMessage: "",
                    isDropdown: true,
                },
            },
            organizationType: {
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
            billingDate: {
                errorObject: {
                    required: true,
                    isValid: true,
                    errorMessage: "",
                    isDropdown: true,
                },
            },

            frequency: {
                errorObject: {
                    required: true,
                    isValid: true,
                    errorMessage: "",
                    isDropdown: true,
                },
            },
            currency: {
                errorObject: {
                    required: true,
                    isValid: true,
                    errorMessage: "",
                    isDropdown: true,
                },
            },
            state: {
                errorObject: {
                    required: true,
                    isValid: true,
                    errorMessage: "",
                    isDropdown: true,
                },
            },
            city: {
                errorObject: {
                    required: true,
                    isValid: true,
                    errorMessage: "",
                    isDropdown: true,
                },
            },
            zipCode: {
                errorObject: {
                    required: true,
                    isValid: true,
                    isNumeric: true,
                    minLength: 6,
                    errorMessage: "",
                },
            },
            noOfUsers: {
                errorObject: {
                    required: true,
                    isValid: true,
                    isNumeric: true,
                    minLength: 1,
                    errorMessage: "",
                },
            },
            billingPrice: {
                errorObject: {
                    required: true,
                    isValid: true,
                    isNumeric: true,
                    minLength: 2,
                    errorMessage: "",
                },
            },
        },
        account: {
            parentAccount: null,
            accountName: "",
            organizationType: null,
            billingContactNumber: "",
            billingAddress: "",
            billingPrimayEmail: "",
            billingSecondaryEmail: "",
            country: null,
            currency: null,
            state: null,
            city: null,
            zipCode: "",
            accountType: null,
            billingDate: null,
            frequency: null,
            taxId: "",
            billingFlag: 1,
            noOfUsers: "",
            billingPrice: ""
        },
    });



    useEffect(() => {

        httpService
            .all([
                httpService.get(API_PATH.GET_COUNTRY),
                httpService.get(API_PATH.GET_CURRENCY),
                httpService.get(API_PATH.GET_ORGANIZATION),
                httpService.get(API_PATH.GET_FREQUENCY),
                httpService.get(API_PATH.GET_ACCOUNTTYPE),
                httpService.get(API_PATH.GET_PARENTACCOUNT),
                httpService.get(API_PATH.GET_BILLING_DATES),

            ])
            .then((responses) => {
                const [countries, currency, organization, frequency, accountType, parentAccount, biilings] = responses;
                setCountries(countries.data);
                setCurrencies(currency.data);
                setOrganiztionTypes(organization.data);
                setFrequencies(frequency.data);
                setAccountTypes(accountType.data);
                setParentAccounts(parentAccount.data);
                setBillingDates(biilings.data)
                console.log(biilings);
            });
    }, []);
    const getStates = (countryId) => {
        httpService.get(`${API_PATH.GET_STATE}${countryId}`).then((res) => {
            setStates(res.data);
        });
    };
    const getCities = (stateId) => {
        httpService.get(`${API_PATH.GET_CITY}${stateId}`).then((res) => {
            setCities(res.data);
        });
    };
    const onDropdownChangeHandler = (cntrlName, value) => {
        const { error, account } = stateObj;
        const validationObj = error[cntrlName];
        const id = value === null ? 0 : value.id;

        const { errorObject } = checkValidity(id, cntrlName, validationObj);
        if (cntrlName === "country") {
            getStates(id);
        } else if (cntrlName === "state") {
            getCities(id);
        }

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

        const { errorObject } = checkValidity(value, name, validationObj);
        setError({
            ...stateObj,
            error: { ...error, [name]: { errorObject } },
            account: { ...account, [name]: value },
        });
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
            httpService.post(API_PATH.CREATE_ACCOUNT, {
                name: account.accountName,
                organizationType: account.organizationType.id,
                accountType: account.accountType.id,
                billingFlag: account.billingFlag,
                billingDate: account.billingDate.id,
                frequency: account.frequency.id,
                taxId: account.taxId,
                currency: account.currency.id,
                billingContactNumber: account.billingContactNumber,
                billingAddress: account.billingAddress,
                billingPrimaryEmail: account.billingPrimayEmail,
                billingSecondaryEmail: account.billingSecondaryEmail,
                parentAccountId: account.parentAccount.id,
                cityId: account.city.id,
                stateId: account.state.id,
                countryId: account.country.id,
                currency: account.currency.id,
                zipCode: account.zipCode,
                noOfUsers: account.noOfUsers,
                billingPrice: account.billingPrice,
                level: account.parentAccount.level + 1
            }).then((res) => {
                if (res.status === 201) {
                    setMessage(snackbarMessages.createSuccess);
                    setSnackbar(true);
                    setTimeout(() => {
                        history.push('/manageclient');
                    }, 1000)
                }
            }).catch(err => {
                setMessage(snackbarMessages.createError);
                setSnackbar(true);
            });
        }
    };

    const closeSnackbar = () => {
        setSnackbar(false);
    };
    return clients.length !== 0 ? <LoadingPage></LoadingPage> : (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Autocomplete
                        value={stateObj.account.parentAccount}
                        onChange={(_event, newValue) => {
                            onDropdownChangeHandler("parentAccount", newValue);
                        }}
                        getOptionLabel={(option) => {
                            return option.name;
                        }}
                        id="controllable-states-demo"
                        name="parentAccount"
                        options={parentAccounts}
                        margin="normal"
                        fullWidth

                        renderInput={(params) => {
                            return (
                                <TextField
                                    {...params}
                                    error={!stateObj.error.parentAccount.errorObject.isValid}
                                    helperText={stateObj.error.parentAccount.errorObject.errorMessage}
                                    name="parentAccount"
                                    margin="normal"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: "new-password", // disable autocomplete and autofill
                                    }}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    className="required-label"
                                    label="Select Parent Account"
                                    variant="outlined"
                                    autoFocus
                                />
                            );
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="accountName"
                        label="Account Name *"
                        name="accountName"
                        error={!stateObj.error.accountName.errorObject.isValid}
                        helperText={
                            stateObj.error.accountName.errorObject.errorMessage
                        }
                        onChange={changeHandler}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            maxLength: 50,
                        }}

                    />
                </Grid>
                <Grid item xs={4}>
                    <Autocomplete
                        value={stateObj.account.organizationType}
                        onChange={(event, newValue) => {
                            onDropdownChangeHandler("organizationType", newValue);
                        }}
                        getOptionLabel={(option) => {
                            return option.long_name;
                        }}
                        id="controllable-states-demo"
                        name="organizationType"
                        options={organiztionTypes}
                        margin="normal"
                        fullWidth
                        renderInput={(params) => {
                            return (
                                <TextField
                                    {...params}
                                    error={!stateObj.error.organizationType.errorObject.isValid}
                                    helperText={stateObj.error.organizationType.errorObject.errorMessage}
                                    name="country"
                                    margin="normal"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: "new-password", // disable autocomplete and autofill
                                    }}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="Organization Type"
                                    variant="outlined"
                                />
                            );
                        }}
                    />
                </Grid>


            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Autocomplete
                        value={stateObj.account.accountType}
                        onChange={(event, newValue) => {
                            onDropdownChangeHandler("accountType", newValue);
                        }}
                        getOptionLabel={(option) => {
                            return option.long_name;
                        }}
                        id="controllable-states-demo"
                        name="accountType"
                        options={accountTypes}
                        margin="normal"
                        fullWidth
                        renderInput={(params) => {
                            return (
                                <TextField
                                    {...params}
                                    error={!stateObj.error.accountType.errorObject.isValid}
                                    helperText={stateObj.error.accountType.errorObject.errorMessage}
                                    name="accountType"
                                    margin="normal"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: "new-password", // disable autocomplete and autofill
                                    }}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="Select Accont Type"
                                    variant="outlined"
                                />
                            );
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <FormLabel id="demo-radio-buttons-group-label">Billing Flag</FormLabel>
                    <RadioGroup
                        row
                        aria-label="TEST"
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={stateObj.account.billingFlag}
                        onChange={(_e, value) => {
                            const { account } = stateObj;

                            setError({
                                ...stateObj,
                                account: { ...account, billingFlag: +value },
                            });
                        }}
                    >
                        <FormControlLabel value={1} control={<Radio />} label="Yes" />
                        <FormControlLabel value={0} control={<Radio />} label="No" />
                    </RadioGroup>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Autocomplete
                        value={stateObj.account.billingDate}
                        onChange={(event, newValue) => {
                            onDropdownChangeHandler("billingDate", newValue);
                        }}
                        getOptionLabel={(option) => {
                            return option.long_name;
                        }}
                        id="controllable-states-demo"
                        name="billingDate"
                        options={billingDates}
                        margin="normal"
                        fullWidth
                        renderInput={(params) => {
                            return (
                                <TextField
                                    {...params}
                                    error={!stateObj.error.billingDate.errorObject.isValid}
                                    helperText={stateObj.error.billingDate.errorObject.errorMessage}
                                    name="billingDate"
                                    margin="normal"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: "new-password", // disable autocomplete and autofill
                                    }}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="Select Billing Date"
                                    variant="outlined"
                                />
                            );
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Autocomplete
                        value={stateObj.account.frequency}
                        onChange={(event, newValue) => {
                            onDropdownChangeHandler("frequency", newValue);
                        }}
                        getOptionLabel={(option) => {
                            return option.long_name;
                        }}
                        id="controllable-states-demo"
                        name="frequency"
                        options={frequencies}
                        margin="normal"
                        fullWidth
                        renderInput={(params) => {
                            return (
                                <TextField
                                    {...params}
                                    error={!stateObj.error.frequency.errorObject.isValid}
                                    helperText={stateObj.error.frequency.errorObject.errorMessage}
                                    name="frequency"
                                    margin="normal"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: "new-password", // disable autocomplete and autofill
                                    }}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="Select Frequency"
                                    variant="outlined"
                                />
                            );
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="taxId"
                        label="Tax Id"
                        name="taxId"
                        error={!stateObj.error.taxId.errorObject.isValid}
                        helperText={
                            stateObj.error.taxId.errorObject.errorMessage
                        }
                        onChange={changeHandler}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            maxLength: 50,
                        }}

                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Autocomplete
                        value={stateObj.account.currency}
                        onChange={(event, newValue) => {
                            onDropdownChangeHandler("currency", newValue);
                        }}
                        getOptionLabel={(option) => {
                            return `${option.long_name} (${option.short_name})`;
                        }}
                        id="controllable-states-demo"
                        name="currency"
                        options={currencies}
                        margin="normal"
                        fullWidth
                        renderInput={(params) => {
                            return (
                                <TextField
                                    {...params}
                                    error={!stateObj.error.currency.errorObject.isValid}
                                    helperText={stateObj.error.currency.errorObject.errorMessage}
                                    name="currency"
                                    margin="normal"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: "new-password", // disable autocomplete and autofill
                                    }}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="Select Currency"
                                    variant="outlined"
                                />
                            );
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="billingContactNumber"
                        label="Billing Contact Number"
                        name="billingContactNumber"
                        error={!stateObj.error.billingContactNumber.errorObject.isValid}
                        helperText={
                            stateObj.error.billingContactNumber.errorObject.errorMessage
                        }
                        onChange={changeHandler}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            maxLength: 50,
                        }}

                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="billingAddress"
                        label="Billing Address"
                        name="billingAddress"
                        error={!stateObj.error.billingAddress.errorObject.isValid}
                        helperText={
                            stateObj.error.billingAddress.errorObject.errorMessage
                        }
                        onChange={changeHandler}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            maxLength: 50,
                        }}

                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="billingPrimayEmail"
                        label="Billing Primary Email"
                        name="billingPrimayEmail"
                        error={!stateObj.error.billingPrimayEmail.errorObject.isValid}
                        helperText={
                            stateObj.error.billingPrimayEmail.errorObject.errorMessage
                        }
                        onChange={changeHandler}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            maxLength: 50,
                        }}

                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="billingSecondaryEmail"
                        label="Billing Secondary Email"
                        name="billingSecondaryEmail"
                        error={!stateObj.error.billingSecondaryEmail.errorObject.isValid}
                        helperText={
                            stateObj.error.billingSecondaryEmail.errorObject.errorMessage
                        }
                        onChange={changeHandler}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            maxLength: 50,
                        }}

                    />
                </Grid>

                <Grid item xs={4}>
                    <Autocomplete
                        value={stateObj.account.country}
                        onChange={(event, newValue) => {
                            onDropdownChangeHandler("country", newValue);
                        }}
                        getOptionLabel={(option) => {
                            return option.name;
                        }}
                        id="controllable-states-demo"
                        name="country"
                        options={countries}
                        margin="normal"
                        fullWidth
                        renderInput={(params) => {
                            return (
                                <TextField
                                    {...params}
                                    error={!stateObj.error.country.errorObject.isValid}
                                    helperText={stateObj.error.country.errorObject.errorMessage}
                                    name="country"
                                    margin="normal"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: "new-password", // disable autocomplete and autofill
                                    }}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="Select Country"
                                    variant="outlined"
                                />
                            );
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Autocomplete
                        value={stateObj.account.state}
                        onChange={(event, newValue) => {
                            onDropdownChangeHandler("state", newValue);
                        }}
                        getOptionLabel={(option) => option.name}
                        id="controllable-states-demo"
                        name="state"
                        options={states}
                        margin="normal"
                        fullWidth
                        renderInput={(params) => {
                            return (
                                <TextField
                                    {...params}
                                    error={!stateObj.error.state.errorObject.isValid}
                                    helperText={stateObj.error.state.errorObject.errorMessage}
                                    name="state"
                                    margin="normal"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: "new-password", // disable autocomplete and autofill
                                    }}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="Select State"
                                    variant="outlined"
                                />
                            );
                        }}
                    />
                </Grid>



                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Autocomplete
                        value={stateObj.account.city}
                        onChange={(event, newValue) => {
                            onDropdownChangeHandler("city", newValue);
                        }}
                        getOptionLabel={(option) => option.name}
                        id="controllable-states-demo"
                        name="city"
                        options={cities}
                        margin="normal"
                        fullWidth
                        renderInput={(params) => {
                            return (
                                <TextField
                                    {...params}
                                    name="city"
                                    error={!stateObj.error.city.errorObject.isValid}
                                    helperText={stateObj.error.city.errorObject.errorMessage}
                                    margin="normal"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: "new-password", // disable autocomplete and autofill
                                    }}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="Select City"
                                    variant="outlined"
                                />
                            );
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="zipCode"
                        label="ZIP Code."
                        name="zipCode"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                        inputProps={{
                            maxLength: 6,
                        }}
                        error={!stateObj.error.zipCode.errorObject.isValid}
                        helperText={stateObj.error.zipCode.errorObject.errorMessage}
                        onChange={changeHandler}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="noOfUsers"
                        label="No. Of Users"
                        name="noOfUsers"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                        inputProps={{
                            maxLength: 6,
                        }}
                        error={!stateObj.error.noOfUsers.errorObject.isValid}
                        helperText={stateObj.error.noOfUsers.errorObject.errorMessage}
                        onChange={changeHandler}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="billingPrice"
                        label="Billing Price"
                        name="billingPrice"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                        inputProps={{
                            maxLength: 6,
                        }}
                        error={!stateObj.error.billingPrice.errorObject.isValid}
                        helperText={stateObj.error.billingPrice.errorObject.errorMessage}
                        onChange={changeHandler}
                    />
                </Grid>
            </Grid>




            <Grid container>
                <Grid
                    item
                    lg={12}
                    xs={12}
                    md={12}
                    className="formBtnHolder"
                    style={{ textAlign: "center" }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={onSubmitHandler}
                    >
                        {" "}
                        Submit
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={onSubmitHandler}
                    >
                        Reset
                    </Button>
                </Grid>
            </Grid>
            <CustomizedSnackbars open={snackbar} closeSnackbar={closeSnackbar} message={message} />
        </React.Fragment>
    );

}

export default ManageAccount;