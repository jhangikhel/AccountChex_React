import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { TextField, MenuItem, Button, Box } from "@material-ui/core";
import { useEffect, useState } from "react";
import { checkValidity, fillTemplate } from "./../../../Shared/index";
import { Autocomplete } from "@material-ui/lab";
import NumberFormatCustom from "./../../../Components/Forms/NumericInput";
import httpService from "../../../API/HttpService/httpService";
import { API_PATH } from "../../../Constants/config";
import { snackbarMessages } from "../../../Constants/errorMessage";
import CustomizedSnackbars from "./../../../Components/CustomizedSnackbars";
import { useHistory } from "react-router-dom";
import LoadingPage from "./../../../Components/Control/LoadingPage";
import TreeViewComponent from "./../../../Components/Control/TreeViewComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  datePicker: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function AddVendor({vendorId}) {
  const classes = useStyles();
  const history = useHistory();
  const [countries, setCountries] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [snackbar, setSnackbar] = React.useState(false);
  const [message, setMessage] = React.useState(snackbarMessages.createSuccess);
  const [stateObj, setError] = useState({
    error: {
      vendorName: {
        errorObject: { required: true, errorMessage: "", isValid: true },
      },
      email: {
        errorObject: {
          required: true,
          errorMessage: "",
          isValid: true,
          isEmail: true,
        },
      },
      websiteURL: {
        errorObject: {
          required: true,
          errorMessage: "",
          isValid: true,
          isURL: true,
        },
      },
      address1: {
        errorObject: { required: true, isValid: true, errorMessage: "", minLength: 10 },
      },
      address2: {
        errorObject: { required: false, isValid: true, errorMessage: "" },
      },
      country: {
        errorObject: {
          required: true,
          isValid: true,
          errorMessage: "",
          isDropdown: true,
        },
      },
      vendor: {
        errorObject: {
          required: false,
          isValid: false,
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
    },
    account: {
      vendorName: "",
      email: "",
      vendor: null,
      websiteURL: "",
      country: null,
      state: null,
      city: null,
      zipCode: "",
      address1: "",
      address2: "",
    },
  });
  useEffect(() => {
    let fillTemp1 = fillTemplate(API_PATH.GET_VENDOR_DETAIL, "vendorId");
    const apiPath1 = fillTemp1(vendorId);
    const { error, account } = stateObj;
    httpService.get(apiPath1).then(r => {
      const { data } = r;
      const {  name: vendorName, emailId: email, websiteUrl: websiteURL,
        country,
        state,
        city,
        zipCode,
        address1,
        address2, } = data;

      console.log({ ...account, address1 });
      setError({
        ...stateObj,
        error: { ...error },
        account: {
          ...account, vendorName, email,  websiteURL, country,
          state,
          city,
          zipCode,
          address1,
          address2
        },
      });
    }).catch(err => {

    })
  }, [vendorId]);
  useEffect(() => {
    httpService
      .all([
        httpService.get(API_PATH.GET_COUNTRY),
        httpService.get(API_PATH.GET_PARENT_VENDOR),
      ])
      .then((responses) => {
        const [countries, vendors] = responses;
        setCountries(countries.data);
        setVendors(vendors.data);
      });
  }, []);
  useEffect(() => {
    if (stateObj.account.country) {
      getStates(stateObj.account.country.id);
    }
  }, [stateObj.account.country])
  useEffect(() => {
    if (stateObj.account.state) {
      getCities(stateObj.account.state.id);
    }
  }, [stateObj.account.state])
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
  const changeHandler = (e) => {
    const { value, name } = e.target;
    const { error, account } = stateObj;
    const validationObj = error[name];

    const { errorObject } = checkValidity(value, name, validationObj);
    console.log(errorObject);
    setError({
      ...stateObj,
      error: { ...error, [name]: { errorObject } },
      account: { ...account, [name]: value },
    });
  };
  const onDropdownChangeHandler = (cntrlName, value) => {
    const { error, account } = stateObj;
    const validationObj = error[cntrlName];
    const id = value === null ? 0 : value.id;

    const { errorObject } = checkValidity(id, cntrlName, validationObj);
    if (cntrlName === "country") {
      setError({
        ...stateObj,
        error: { ...error, [cntrlName]: { errorObject } },
        account: { ...account, [cntrlName]: value, city: null, state: null },
      });
      return;
     
    } else if (cntrlName === "state") {
      setError({
        ...stateObj,
        error: { ...error, [cntrlName]: { errorObject } },
        account: { ...account, [cntrlName]: value, city: null },
      });
     return;
    }
    console.log(cntrlName, value);
    setError({
      ...stateObj,
      error: { ...error, [cntrlName]: { errorObject } },
      account: { ...account, [cntrlName]: value },
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
      console.log(errorObject.errorMessage, name);
      if (errorObject.errorMessage !== "") {
        result = false;
      }

      error[name] = { errorObject };
    }

    setError({ account, error: error });
    console.log(result);
    if (result === true) {
      httpService
        .post(API_PATH.CREATE_VENDOR, {
          name: account.vendorName,
          parentId: account.vendor && account.vendor.id,
          emailId: account.email,
          websiteUrl: account.websiteURL,
          address1: account.address1,
          address2: account.address2,
          cityId: account.city.id,
          stateId: account.state.id,
          countryId: account.country.id,
          zipCode: account.zipCode,
        })
        .then((res) => {
          console.log(res);
          setMessage("Vendor Successfully Created");
          setSnackbar(true);

          history.push("/managevendor");
        })
        .catch((e) => {
          if (e.response.status === 409 || e.response.status === 404) {
            setMessage(e.response.data.message);
          } else if (e.response.status === 400) {
            setMessage(e.response.data.message[0]);
          }

          setSnackbar(true);
        });
    }
  };
  const closeSnackbar = () => {
    setSnackbar(false);
  };

  return countries.length === 0 ? (
    <LoadingPage></LoadingPage>
  ) : (
    <React.Fragment>
      <Grid container spacing={2}>

        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Autocomplete
            value={stateObj.account.vendor}
            onChange={(_event, newValue) => {
              if (newValue !== null) newValue.id = newValue.vendor_parentId;
              onDropdownChangeHandler("vendor", newValue);
            }}
            getOptionLabel={(option) => {
              return option.vendor_name;
            }}
            id="controllable-states-demo"
            name="vendor"
            options={vendors}
            margin="normal"
            fullWidth
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  // error={!stateObj.error.vendor.errorObject.isValid}
                  // helperText={stateObj.error.vendor.errorObject.errorMessage}
                  name="vendor"
                  margin="normal"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Parent Vendor"
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
            id="vendorName"
            label="Vendor Name"
            name="vendorName"
            error={!stateObj.error.vendorName.errorObject.isValid}
            helperText={stateObj.error.vendorName.errorObject.errorMessage}
            onChange={changeHandler}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              maxLength: 50,
            }}
            value={stateObj.account.vendorName}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Id"
            name="email"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              maxLength: 50,
            }}
            error={!stateObj.error.email.errorObject.isValid}
            helperText={stateObj.error.email.errorObject.errorMessage}
            onChange={changeHandler}
            value={stateObj.account.email}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="websiteURL"
            label="Website URL"
            name="websiteURL"
            error={!stateObj.error.websiteURL.errorObject.isValid}
            helperText={stateObj.error.websiteURL.errorObject.errorMessage}
            onChange={changeHandler}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              maxLength: 50,
            }}
            value={stateObj.account.websiteURL}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="address1"
            label="Address 1"
            name="address1"
            autoComplete="address1"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              maxLength: 250,
            }}
            error={!stateObj.error.address1.errorObject.isValid}
            helperText={stateObj.error.address1.errorObject.errorMessage}
            onChange={changeHandler}
            value={stateObj.account.address1}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="address2"
            label="Address 2"
            name="address2"
            autoComplete="address2"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={changeHandler}
            value={stateObj.account.address2}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={4}>
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
          value={stateObj.account.zipCode}
        />
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
      <CustomizedSnackbars
        open={snackbar}
        closeSnackbar={closeSnackbar}
        message={message}
      />
    </React.Fragment>
  );
}
