import { Button, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { useContext } from 'react';
import LoadingPage from '../../../../Components/Control/LoadingPage';
import UserContext from '../../../../context/user/user-context';

const CreateUser = () => {

    const ctxUser = useContext(UserContext);
    const { accounts, onDropdownChangeHandler, stateObj, changeHandler,
        countries, changeHandlerRadioBtn, onSubmitHandler } = ctxUser;

    return (
        ctxUser.isLoading ? <LoadingPage></LoadingPage> : (
            <React.Fragment>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <Autocomplete
                            value={stateObj.account.account}
                            onChange={(_event, newValue) => {
                                onDropdownChangeHandler("account", newValue);
                            }}
                            getOptionLabel={(option) => {
                                return option.name;
                            }}
                            id="controllable-states-demo"
                            name="account"
                            options={accounts}
                            margin="normal"
                            fullWidth

                            renderInput={(params) => {
                                return (
                                    <TextField
                                        {...params}
                                        error={!stateObj.error.account.errorObject.isValid}
                                        helperText={stateObj.error.account.errorObject.errorMessage}
                                        name="account"
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
                            id="userName"
                            label="User Name"
                            name="userName"
                            autoComplete="userName"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                maxLength: 250,
                            }}
                            error={!stateObj.error.userName.errorObject.isValid}
                            helperText={stateObj.error.userName.errorObject.errorMessage}
                            onChange={changeHandler}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            autoComplete="firstName"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                maxLength: 250,
                            }}
                            error={!stateObj.error.firstName.errorObject.isValid}
                            helperText={stateObj.error.firstName.errorObject.errorMessage}
                            onChange={changeHandler}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lastName"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                maxLength: 250,
                            }}
                            error={!stateObj.error.lastName.errorObject.isValid}
                            helperText={stateObj.error.lastName.errorObject.errorMessage}
                            onChange={changeHandler}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="primaryPhone"
                            label="Contact Number"
                            name="primaryPhone"
                            autoComplete="primaryPhone"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                maxLength: 250,
                            }}
                            error={!stateObj.error.primaryPhone.errorObject.isValid}
                            helperText={stateObj.error.primaryPhone.errorObject.errorMessage}
                            onChange={changeHandler}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="secondaryPhone"
                            label="Secondary Contact Number"
                            name="secondaryPhone"
                            autoComplete="secondaryPhone"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                maxLength: 250,
                            }}
                            error={!stateObj.error.secondaryPhone.errorObject.isValid}
                            helperText={stateObj.error.secondaryPhone.errorObject.errorMessage}
                            onChange={changeHandler}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <Autocomplete
                            value={stateObj.account.country}
                            onChange={(_event, newValue) => {
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
                                        className="required-label"
                                        label="Select Country"
                                        variant="outlined"
                                        autoFocus
                                    />
                                );
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <FormLabel id="demo-radio-buttons-group-label">User Lock</FormLabel>
                        <RadioGroup
                            row
                            aria-label="TEST"
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={stateObj.account.userLock}
                            onChange={changeHandlerRadioBtn}
                        >
                            <FormControlLabel value={1} control={<Radio />} label="Yes" />
                            <FormControlLabel value={0} control={<Radio />} label="No" />
                        </RadioGroup>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <Autocomplete
                            value={stateObj.account.role}
                            onChange={(_event, newValue) => {
                                onDropdownChangeHandler("role", newValue);
                            }}
                            getOptionLabel={(option) => {
                                return option.name;
                            }}
                            id="controllable-states-demo"
                            name="role"
                            options={accounts}
                            margin="normal"
                            fullWidth

                            renderInput={(params) => {
                                return (
                                    <TextField
                                        {...params}
                                        error={!stateObj.error.role.errorObject.isValid}
                                        helperText={stateObj.error.role.errorObject.errorMessage}
                                        name="role"
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
                                        label="Select Role"
                                        variant="outlined"
                                        autoFocus
                                    />
                                );
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Id"
                            name="email"
                            autoComplete="email"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                maxLength: 250,
                            }}
                            error={!stateObj.error.email.errorObject.isValid}
                            helperText={stateObj.error.email.errorObject.errorMessage}
                            onChange={changeHandler}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Confirm Email Id"
                            name="confirmEmail"
                            autoComplete="confirmEmail"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                maxLength: 250,
                            }}
                            error={!stateObj.error.confirmEmail.errorObject.isValid}
                            helperText={stateObj.error.confirmEmail.errorObject.errorMessage}
                            onChange={changeHandler}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={16}>
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
            </React.Fragment>)
    );
}

export default CreateUser;