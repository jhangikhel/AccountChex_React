import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
} from "@material-ui/core";
import theme from "../config/theme";
import WithPublic from "./../Components/hoc/WithPublic";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { PAGE_PATH } from "./../Constants/config";
import { checkValidity } from "./../Shared/index";
const useStyles = makeStyles((theme) => ({
  formControl: {
    lineHeight: "normal",
    marginBottom: "20px",
  },
  loginBtn: {
    marginBottom: "20px",
    fontSize: "1rem",
  },
}));
const ForgotPassword = () => {
  const classes = useStyles();
  const [isBtnDisabled, setButtonDisabled] = useState(false);
  const [stateObj, setError] = useState({
    error: {
      email: {
        errorObject: { required: true, errorMessage: "", isValid: true },
      },
      userName: {
        errorObject: {
          required: true,
          errorMessage: "",
          minLength: 8,
          isValid: true,
        },
      },
    },
    account: { email: "", userName: "" },
  });

  useEffect(() => {
    const { error, account } = stateObj;
    let isValid = true;
    for (let er in error) {
      const errorObj = error[er];
      for (let obj in errorObj) {
        let errorObjbect = errorObj[obj];
        if (errorObjbect.isValid === false || account[er].trim() === "") {
          isValid = false;
          break;
        }
      }
    }
    setButtonDisabled(isValid);
  }, [stateObj]);
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
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Box display="flex" className="gradientbg">
      <Box className="loginHolder" boxShadow={3}>
        <WithPublic
          heading={"Forgot Password"}
          pageLink={PAGE_PATH.login}
          subTitle={"Email will be sent on your Email ID to reset password"}
          pageName="Back to Login"
        >
          <form className={classes.form} noValidate>
            <p className="errorMsg">please check username password</p>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                className={classes.formControl}
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
              />

              <TextField
                className={classes.formControl}
                variant="outlined"
                margin="normal"
                error={!stateObj.error.userName.errorObject.isValid}
                helperText={stateObj.error.userName.errorObject.errorMessage}
                fullWidth
                name="userName"
                label="User name"
                type="text"
                id="userName"
                onChange={changeHandler}
              />
            </Grid>

            <Grid
              item
              xs={12}
              lg={12}
              md={12}
              style={{ marginTop: "15px", marginBottom: "10px" }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.loginBtn}
                onClick={onSubmitHandler}
                style={{ margin: "auto 0px" }}
              >
                Submit
              </Button>
            </Grid>
          </form>
        </WithPublic>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
