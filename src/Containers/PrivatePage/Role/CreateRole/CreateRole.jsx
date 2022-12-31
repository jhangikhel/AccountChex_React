import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useState } from 'react';


const CreateRole = () => {
    const [vendors, setVendors] = useState([]);
    const [stateObj, setError] = useState({
        error: {
            accountName: {
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
            biilingDate: null,
            frequency: null,
            taxId: ""
        },
    });
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
    }
    return (<React.Fragment>
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
                    options={vendors}
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
                                label="Select Account"
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
                    label="Role Name *"
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

            <Grid item xs={12} sm={12} md={6} lg={4}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="accountName"
                    label="Role Description *"
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

        </Grid>
        <Grid container spacing={2}>
            <Grid item style={{ border: "1px solid grey" }} xs={12} sm={12} md={6} lg={4}>
                <Grid style={{ borderBottom: "1px solid grey" }} item xs={12} sm={12} md={6} lg={12}>
                    <FormControl>

                        <RadioGroup
                            row
                            aria-labelledby="demo-form-control-label-placement"
                            name="position"
                            defaultValue="top"
                        >
                            <FormControlLabel

                                value="Module"
                                control={<FormLabel />}
                                label="Module"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                style={{ marginLeft: '80px' }}
                                value="view"
                                control={<Radio />}
                                label="View"

                                labelPlacement="start"
                            />
                            <FormControlLabel
                                value="edit"
                                control={<Radio />}
                                label="Edit"
                                labelPlacement="start"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={12}>
                    <FormControl>

                        <RadioGroup
                            row
                            aria-labelledby="demo-form-control-label-placement"
                            name="position"
                            defaultValue="top"
                        >
                            <FormControlLabel

                                value="Module"
                                control={<FormLabel />}
                                label="Module"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                style={{ marginLeft: '80px' }}
                                value="view"
                                control={<Radio />}
                                label="View"

                                labelPlacement="start"
                            />
                            <FormControlLabel
                                value="edit"
                                control={<Radio />}
                                label="Edit"
                                labelPlacement="start"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid item style={{ border: "1px solid grey" }} xs={12} sm={12} md={6} lg={4}>
                <Grid style={{ borderBottom: "1px solid grey" }} item xs={12} sm={12} md={6} lg={12}>
                    <FormControl>

                        <RadioGroup
                            row
                            aria-labelledby="demo-form-control-label-placement"
                            name="position"
                            defaultValue="top"
                        >
                            <FormControlLabel

                                value="Module"
                                control={<FormLabel />}
                                label="Module"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                style={{ marginLeft: '80px' }}
                                value="view"
                                control={<Radio />}
                                label="View"

                                labelPlacement="start"
                            />
                            <FormControlLabel
                                value="edit"
                                control={<Radio />}
                                label="Edit"
                                labelPlacement="start"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={12}>
                    <FormControl>

                        <RadioGroup
                            row
                            aria-labelledby="demo-form-control-label-placement"
                            name="position"
                            defaultValue="top"
                        >
                            <FormControlLabel

                                value="Module"
                                control={<FormLabel />}
                                label="Module"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                style={{ marginLeft: '80px' }}
                                value="view"
                                control={<Radio />}
                                label="View"

                                labelPlacement="start"
                            />
                            <FormControlLabel
                                value="edit"
                                control={<Radio />}
                                label="Edit"
                                labelPlacement="start"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid item style={{ border: "1px solid grey" }} xs={12} sm={12} md={6} lg={4}>
                <Grid style={{ borderBottom: "1px solid grey" }} item xs={12} sm={12} md={6} lg={12}>
                    <FormControl>

                        <RadioGroup
                            row
                            aria-labelledby="demo-form-control-label-placement"
                            name="position"
                            defaultValue="top"
                        >
                            <FormControlLabel

                                value="Module"
                                control={<FormLabel />}
                                label="Module"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                style={{ marginLeft: '80px' }}
                                value="view"
                                control={<Radio />}
                                label="View"

                                labelPlacement="start"
                            />
                            <FormControlLabel
                                value="edit"
                                control={<Radio />}
                                label="Edit"
                                labelPlacement="start"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={12}>
                    <FormControl>

                        <RadioGroup
                            row
                            aria-labelledby="demo-form-control-label-placement"
                            name="position"
                            defaultValue="top"
                        >
                            <FormControlLabel

                                value="Module"
                                control={<FormLabel />}
                                label="Module"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                style={{ marginLeft: '80px' }}
                                value="view"
                                control={<Radio />}
                                label="View"

                                labelPlacement="start"
                            />
                            <FormControlLabel
                                value="edit"
                                control={<Radio />}
                                label="Edit"
                                labelPlacement="start"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </Grid>
        <Grid container style={{marginTop:'30px'}} spacing={2}>
            <Grid item style={{ border: "1px solid grey" }} xs={12} sm={12} md={6} lg={4}>
                <Grid style={{ borderBottom: "1px solid grey" }} item xs={12} sm={12} md={6} lg={12}>
                    <FormControl>

                        <RadioGroup
                            row
                            aria-labelledby="demo-form-control-label-placement"
                            name="position"
                            defaultValue="top"
                        >
                            <FormControlLabel

                                value="Module"
                                control={<FormLabel />}
                                label="Module"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                style={{ marginLeft: '80px' }}
                                value="view"
                                control={<Radio />}
                                label="View"

                                labelPlacement="start"
                            />
                            <FormControlLabel
                                value="edit"
                                control={<Radio />}
                                label="Edit"
                                labelPlacement="start"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={12}>
                    <FormControl>

                        <RadioGroup
                            row
                            aria-labelledby="demo-form-control-label-placement"
                            name="position"
                            defaultValue="top"
                        >
                            <FormControlLabel

                                value="Module"
                                control={<FormLabel />}
                                label="Module"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                style={{ marginLeft: '80px' }}
                                value="view"
                                control={<Radio />}
                                label="View"

                                labelPlacement="start"
                            />
                            <FormControlLabel
                                value="edit"
                                control={<Radio />}
                                label="Edit"
                                labelPlacement="start"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </Grid>
        <Grid container spacing={8}>
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
    </React.Fragment>);
}

export default CreateRole;