import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { TextField, MenuItem, Button, Box ,TextareaAutosize} from "@material-ui/core";
import { useEffect, useState } from "react";
import { checkValidity, fillTemplate } from "./../../../Shared/index";
import { Autocomplete } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import { snackbarMessages } from "../../../Constants/errorMessage";
import { API_PATH } from "../../../Constants/config";
import CustomizedSnackbars from './../../../Components/CustomizedSnackbars';
import NumberFormatCustom from "../../../Components/Forms/NumericInput";
import httpService from "../../../API/HttpService/httpService";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import LoadingPage from "../../../Components/Control/LoadingPage";

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

export default function AddProject(props) {
  const classes = useStyles();
  const history = useHistory();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [snackbar, setSnackbar] = React.useState(false);
  const [vendors, setVendors] = useState([]);
  const [accountManagers, setAccountManagers] = useState([]);
  const [clients, setClients] = useState([]);
  const [vendorsTier2, setvendorsTier2] = useState([]);
  const [message, setMessage] = React.useState(snackbarMessages.createSuccess);
  const [isVendorTier2Disabled, setVendorTier2Disabled] = useState(true);
  const [stateObj, setError] = useState({
    error: {
      projectTitle: {
        errorObject: { required: true, errorMessage: "", isValid: true },
      },
      projectDescription: {
        errorObject: { required: true, errorMessage: "", isValid: true },
      },
      vendor: {
        errorObject: {
          required: true,
          isValid: true,
          errorMessage: "",
          isDropdown: true,
        },
      },
       accountManager: {
        errorObject: {
          required: true,
          isValid: true,
          errorMessage: "",
          isDropdown: true,
        },
      },
       client: {
        errorObject: {
          required: true,
          isValid: true,
          errorMessage: "",
          isDropdown: true,
        },
      },
      startDate: {
        errorObject: {
          required: true,
          isValid: true,
          isDate: true,
          errorMessage: "",
        },
      },
      endDate: {
        errorObject: {
          required: true,
          isValid: true,
          isDate: true,
          errorMessage: "",
        },
      }, 
      workAddress: {
        errorObject: { required: true, isValid: true, errorMessage: "" },
      },
      country: {
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
      vendorsTier2: {
        errorObject: {
          required: true,
          isValid: true,
          isNumeric: true,
          errorMessage: "",
        },
      },
    },
    account: {
      projectTitle: "",
      projectDescription:"",
      accountManager:null,
      vendor:null,
      vendorsTier2: null,
      client:null,
      startDate: new Date(),
      endDate: new Date(),
      workAddress: "",
      country: null,
      state: null,
      city: null,
      zipCode: ""
    },
  });

  const accountId = 1;
  let fillTemp1 = fillTemplate(API_PATH.GET_CLIENTS, "organizationId");

  useEffect(() => {
    const apiPath1 = fillTemp1(accountId);
    httpService
      .all([
        httpService.get(API_PATH.GET_COUNTRY),
        httpService.get(API_PATH.GET_VENDOR+accountId),
        httpService.get(API_PATH.GET_MANAGER),
        httpService.get(apiPath1)
      ])
      .then((responses) => {
        const [countries,vendors,managers,clients] = responses;
        setCountries(countries.data);
        setVendors(vendors.data)
        setAccountManagers(managers.data);
        setClients(clients.data)
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
    }else if (cntrlName === "vendor") {
      getVendors(id);
    } 

    setError({
      ...stateObj,
      error: { ...error, [cntrlName]: { errorObject } },
      account: { ...account, [cntrlName]: value },
    });
  };
  const getVendors = (accountId) => {
    httpService.get(`${API_PATH.GET_VENDOR}${accountId}`).then((res) => {
      setvendorsTier2(res.data);
      if (res.data) {
        setVendorTier2Disabled(false);
      } else {
        setVendorTier2Disabled(true);
      }
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
      console.log(errorObject.errorMessage, name);
      if (errorObject.errorMessage !== "") {
        result = false;
      }

      error[name] = { errorObject };
    }

    setError({ account, error: error });

    if (result === true) {
      let parentOrg = account.vendor.id;
      if(account.vendorsTier2 != null){
        parentOrg = account.vendorsTier2.id;
      }
 
      httpService.post(API_PATH.CREATE_PROJECT, {
        projectTitle:account.projectTitle,
        projectDescription:account.projectDescription,
        accountManager:account.accountManager.id,
        vendor1:account.vendor.id,
        vendor2:account.vendorsTier2,
        clientId:account.client.id,
        startDate:new Date(account.startDate).getTime(),
        endDate:new Date(account.endDate).getTime(),
        workAddress:account.workAddress,
        city:account.city.id,
        state:account.state.id,
        country:account.country.id,
        zipCode:account.zipCode
    }).then((res) => {
          setMessage(res.data[0].msg);
          setSnackbar(true);
          setTimeout(()=>{
            if(res.data[0].status === 1){
              history.push('/manageproject');
            }
          },1000)
         
      }).catch(err=>{
          setMessage(snackbarMessages.createError);
          setSnackbar(true);
      });
    }
  };
  const onDatePickerChanged = (cntrlName, value) => {
    const { error, account } = stateObj;
    const validationObj = error[cntrlName];
    console.log(cntrlName, value, validationObj);
    const { errorObject } = checkValidity(value, cntrlName, validationObj);
    setError({
      ...stateObj,
      error: { ...error, [cntrlName]: { errorObject } },
      account: { ...account, [cntrlName]: value },
    });
  };

  const closeSnackbar = () => {
    setSnackbar(false);
}; 
  return clients.length !== 0 ? <LoadingPage></LoadingPage> : (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="projectTitle"
            label="Project Title"
            name="projectTitle"
            error={!stateObj.error.projectTitle.errorObject.isValid}
            helperText={
              stateObj.error.projectTitle.errorObject.errorMessage
            }
            onChange={changeHandler}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              maxLength: 50,
            }}
            autoFocus
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            value={stateObj.account.accountManager}
            onChange={(event, newValue) => {
              onDropdownChangeHandler("accountManager", newValue);
            }}
            getOptionLabel={(option) => {
              return option.account_manager;
            }}
            id="controllable-states-demo"
            name="accountManager"
            options={accountManagers}
            margin="normal"
            fullWidth
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  error={!stateObj.error.accountManager.errorObject.isValid}
                  helperText={stateObj.error.accountManager.errorObject.errorMessage}
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
                  label="Account Manager"
                  variant="outlined"
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            value={stateObj.account.vendor}
            onChange={(event, newValue) => {
              onDropdownChangeHandler("vendor", newValue);
            }}
            getOptionLabel={(option) => {
              return option.name;
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
                  error={!stateObj.error.vendor.errorObject.isValid}
                  helperText={stateObj.error.vendor.errorObject.errorMessage}
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
                  label="Select Vendor"
                  variant="outlined"
                />
              );
            }}
          />
        </Grid>

      </Grid>
     
      <Grid container spacing={2}>
      <Grid item xs={4}>
          <Autocomplete
            value={stateObj.account.vendorsTier2}
            onChange={(event, newValue) => {
              onDropdownChangeHandler("vendorsTier2", newValue);
            }}
            getOptionLabel={(option) => {
              return option.name;
            }}
            id="controllable-states-demo"
            name="vendorsTier2"
            options={vendorsTier2}
            margin="normal"
            disabled={isVendorTier2Disabled}
            fullWidth
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  error={!stateObj.error.vendorsTier2.errorObject.isValid}
                  helperText={
                    stateObj.error.vendorsTier2.errorObject.errorMessage
                  }
                  name="vendorsTier2"
                  margin="normal"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Select Vendor Tier 2"
                  variant="outlined"
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
            <Autocomplete
              value={stateObj.account.client}
              onChange={(event, newValue) => {
                onDropdownChangeHandler("client", newValue);
              }}
              getOptionLabel={(option) => {
                return option.name;
              }}
              id="controllable-states-demo"
              name="client"
              options={clients}
              margin="normal"
              fullWidth
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    error={!stateObj.error.client.errorObject.isValid}
                    helperText={stateObj.error.client.errorObject.errorMessage}
                    name="client"
                    margin="normal"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Select Client"
                    variant="outlined"
                  />
                );
              }}
            />
          </Grid> 
       
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              inputVariant="outlined"
              fullWidth
              disableFuture
              id="date-picker-dialog"
              label="Start Date"
              format="MM/dd/yyyy"
              value={stateObj.account.startDate}
              onChange={(event, newValue) => {
                onDatePickerChanged("startDate", newValue);
              }}
              error={!stateObj.error.startDate.errorObject.isValid}
              helperText={stateObj.error.startDate.errorObject.errorMessage}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>

    </Grid>
<Grid container spacing={2}>
<Grid item xs={12} sm={12} md={6} lg={4}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              inputVariant="outlined"
              fullWidth
              disableFuture
              id="date-picker-dialog"
              label="End Date"
              format="MM/dd/yyyy"
              value={stateObj.account.endDate}
              onChange={(event, newValue) => {
                onDatePickerChanged("endDate", newValue);
              }}
              error={!stateObj.error.endDate.errorObject.isValid}
              helperText={stateObj.error.endDate.errorObject.errorMessage}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="workAddress"
              label="Work Address"
              name="workAddress"
              autoComplete="workAddress"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                maxLength: 250,
              }}
              error={!stateObj.error.workAddress.errorObject.isValid}
              helperText={stateObj.error.workAddress.errorObject.errorMessage}
              onChange={changeHandler}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={4}>
            <Autocomplete
              value={stateObj.account.country}
              onChange={(event, newValue) => {
                onDropdownChangeHandler("country", newValue);
              }}
              getOptionLabel={(option) => {
                return option.alias;
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
          </Grid>
          <Grid container spacing={2}>
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
          </Grid> 
          <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="projectDescription"
            label="Project Description"
            name="projectDescription"
            //placeholder="Description"
            multiline
            rows={4}
            rowsMax={4}
            error={!stateObj.error.projectDescription.errorObject.isValid}
            helperText={
              stateObj.error.projectDescription.errorObject.errorMessage
            }
            onChange={changeHandler}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
                maxLength: 500,
            }}
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
      <CustomizedSnackbars open={snackbar} closeSnackbar={closeSnackbar} message={message}/>
      </React.Fragment>
  );
}
