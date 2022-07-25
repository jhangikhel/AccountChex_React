import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import httpService from '../../../API/HttpService/httpService';
import { checkValidity } from './../../../Shared/index';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'block'
    }, form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
}));
const ChangePassword = () => {
    const classes = useStyles();
    const [isBtnDisabled, setButtonDisabled] = useState(false);
    const [stateObj, setError] = useState({
        error: {
            email: { errorObject: { required: true, errorMessage: "", isValid: true } },
            password: {
                errorObject: { required: true, errorMessage: "", minLength: 10, isValid: true }
            }
        },
        account: { email: '', password: '' }
    });

    useEffect(() => {
        const { error, account } = stateObj;
        let isValid = true;
        for (let er in error) {
            const errorObj = error[er];
            for (let obj in errorObj) {
                let errorObjbect = errorObj[obj];
                if (errorObjbect.isValid === false || account[er].trim() === '') {
                    isValid = false;
                    break;
                }
            }
        }
        setButtonDisabled(isValid);

    }, [stateObj])
    const changeHandler = (e) => {
        const { value, name } = e.target;
        const { error, account } = stateObj;
        const validationObj = error[name];

        const { errorObject } = checkValidity(value, name, validationObj);

        setError({ ...stateObj, error: { ...error, [name]: { errorObject } }, account: { ...account, [name]: value } });

    }
    const onSubmitHandler = (e) => {
        const { account } = stateObj;
        const { email, password } = account;
        httpService.post('/login', {
            username: email,
            password
        }).then((res) => {
            console.log(res);
        });
        e.preventDefault();
    }

    return (
        <div className={classes.root}>
            <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    error={!stateObj.error.email.errorObject.isValid}
                    margin="normal"
                    helperText={stateObj.error.email.errorObject.errorMessage}
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={changeHandler}
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    error={!stateObj.error.password.errorObject.isValid}
                    helperText={stateObj.error.password.errorObject.errorMessage}
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={changeHandler}
                    autoComplete="current-password"
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={onSubmitHandler}
                    disabled={!isBtnDisabled}
                >
                    Sign In

                </Button>
            </form>
        </div>
    );
};

export default ChangePassword;