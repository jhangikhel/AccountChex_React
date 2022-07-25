import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  Grid,
} from "@material-ui/core";

import WithPublic from "./../Components/hoc/WithPublic";

import { makeStyles } from "@material-ui/core/styles";
import { PAGE_PATH } from "./../Constants/config";
import { checkValidity } from "./../Shared/index";
import httpService from "./../API/HttpService/httpService";
import { useHistory } from "react-router-dom";
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
export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [isBtnDisabled, setButtonDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const [stateObj, setError] = useState({
    error: {
      email: {
        errorObject: { required: true, errorMessage: "", isValid: true },
      },
      password: {
        errorObject: {
          required: true,
          errorMessage: "",
          isValid: true,
        },
      },
    },
    account: { email: "", password: "" },
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
    const { error, account } = stateObj;
    const { email, password } = account;
    let result = true;
    for (let err in error) {
      const value = account[err];
      const name = err;

      const validationObj = error[name];

      const { errorObject } = checkValidity(value, name, validationObj);
      console.log(errorObject.errorMessage, name);
      if (errorObject.errorMessage.trim() !== "") {
        result = false;
      }
      error[name] = { errorObject };
    }

    setError({ account, error: error });
    /* if (result === true) {
      httpService
        .post("/login", {
          userName: email,
          password,
        })
        .then((res) => {
          if (res.data.status === 1) history.push("/manageproject");
          else setErrorMsg(res.data.message);
        });
    } */
    e.preventDefault();
  };

  return (
    <Box display="flex" className="gradientbg">
      <Box className="loginHolder" boxShadow={3}>
        <WithPublic
          heading={"Login"}
          pageLink={PAGE_PATH.forgotPassword}
          pageName="Forgot Password?"
        >
          <form className={classes.form} noValidate>
            {errorMsg &&
              <p className="errorMsg">{errorMsg}</p>
            }
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                fullWidth
                className={classes.formControl}
                id="email"
                variant="outlined"
                label="Email Address"
                name="email"
                autoComplete="Email"
                error={!stateObj.error.email.errorObject.isValid}
                helperText={stateObj.error.email.errorObject.errorMessage}
                onChange={changeHandler}
              />

              <TextField
                className={classes.formControl}
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
            </Grid>
            <Grid item xs={12} lg={12} md={12} style={{ textAlign: "left" }}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </Grid>
            <Grid item xs={12} lg={12} md={12} style={{ marginBottom: "10px" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.loginBtn}
                onClick={onSubmitHandler}
                style={{ margin: "auto 0px" }}
              >
                LOGIN
              </Button>
            </Grid>
          </form>
        </WithPublic>
      </Box>
    </Box>
  );
}
