import React, { useEffect, useState } from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import httpService from "../../../API/HttpService/httpService";
import { API_PATH } from "./../../../Constants/config";
import MoneyInput from "./../../../Components/Forms/MoneyInput";
import { Autocomplete } from "@material-ui/lab";
import { checkValidity } from "./../../../Shared/index";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function EmployementDetail(props) {
  const [billingStatus, setBillingStatus] = useState([]);
  const [taxType, setTaxType] = useState([]);
  const [workAuthorization, setWorkAuthorization] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [wageCycle, setWageCycle] = useState([]);
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [vendorsTier2, setvendorsTier2] = useState([]);
  const [reportingTo, setReportingTo] = useState([]);
  const [isVendorTier2Disabled, setVendorTier2Disabled] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const [stateObj, setError] = useState({
    error: {
      employeeId: {
        errorObject: {
          required: true,
          isValid: true,
          errorMessage: "",
        },
      },
      designation: {
        errorObject: {
          required: true,
          isValid: true,
          errorMessage: "",
          isDropdown: true,
        },
      },
      vendor: {
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
      project: {
        errorObject: {
          required: true,
          isValid: true,
          errorMessage: "",
          isDropdown: true,
        },
      },
      department: {
        errorObject: {
          required: true,
          isValid: true,
          errorMessage: "",
          isDropdown: true,
        },
      },
      reportingTo: {
        errorObject: {
          required: true,
          isValid: true,
          errorMessage: "",
          isDropdown: true,
        },
      },
      taxTerms: {
        errorObject: {
          required: true,
          isValid: true,
          errorMessage: "",
          isDropdown: true,
        },
      },
      workAuth: {
        errorObject: {
          required: true,
          isValid: true,
          errorMessage: "",
          isDropdown: true,
        },
      },
      billingStatus: {
        errorObject: {
          required: true,
          isValid: true,
          errorMessage: "",
          isDropdown: true,
        },
      },
      wageCycle: {
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
      wageRate: {
        errorObject: {
          required: true,
          isValid: true,
          isNumeric: true,
          errorMessage: "",
        },
      },
      vendorsTier2: {
        errorObject: {
          required: true,
          isValid: true,
          errorMessage: "",
          isDropdown: true,
        },
      },
    },
    account: {
      employeeId: '',
      designation: null,
      project: null,
      client: null,
      startDate: new Date(),
      vendor: null,
      department: null,
      reportingTo: null,
      taxTerms: null,
      workAuth: null,
      billingStatus: null,
      wageCycle: null,
      wageRate: "",
      vendorsTier2: null,
    },
  });
  useEffect(() => {
    httpService
      .all([
        httpService.get(API_PATH.GET_BILLING_STATUS),
        httpService.get(API_PATH.GET_TAX_TYPE),
        httpService.get(API_PATH.GET_WORK_AUTHORIZATION),
        httpService.get(API_PATH.GET_DESIGNATION),
        httpService.get(API_PATH.GET_DEPARTMENTS),
        httpService.get(API_PATH.GET_WAGE_CYCLE),
        httpService.get(`${API_PATH.GET_VENDOR}1`),
      ])
      .then((responses) => {
        const [
          billingStatus,
          taxType,
          workAuthorization,
          designations,
          departments,
          wageCycle,
          vendors,
        ] = responses;
        setBillingStatus(billingStatus.data);
        setTaxType(taxType.data);
        setWorkAuthorization(workAuthorization.data);
        setDesignations(designations.data);
        setDepartments(departments.data);
        setWageCycle(wageCycle.data);
        setVendors(vendors.data);
      });
  }, []);
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
  const getReportingTo = (departmentId) => {
    setLoading(true);
    httpService
      .get(`${API_PATH.GET_REPORTINGTO}${departmentId}`)
      .then((res) => {
        setReportingTo(res.data);
        setLoading(false);
      });
  };
  const getVendors = (accountId) => {
    setLoading(true);
    httpService.get(`${API_PATH.GET_VENDOR}${accountId}`).then((res) => {

      if (res.data && res.data.length > 0) {
        setVendorTier2Disabled(false);
        setvendorsTier2(res.data);
        setLoading(false);
      } else {
        setVendorTier2Disabled(true);
        getClients(accountId);
        setLoading(false);
      }
    });
  };
  const getProjects = (clientId) => {
    httpService.get(`${API_PATH.GET_PROJECT}${clientId}`).then((res) => {
      setProjects(res.data);
    });
  };
  const getClients = (vendorId) => {
    httpService.get(`${API_PATH.GET_CLIENT_BY_VENDOR_ID}${vendorId}`).then((res) => {
      setClients(res.data);
    });
  };
  const onDropdownChangeHandler = (cntrlName, value) => {
    const { error, account } = stateObj;
    const { vendorsTier2 } = error;
    const validationObj = error[cntrlName];
    const id = value === null ? 0 : value.id;

    const { errorObject } = checkValidity(id, cntrlName, validationObj);
    if (cntrlName === "department") {
      stateObj.account.reportingTo = null;
      if (id !== 0)
        getReportingTo(id);
      else
        setReportingTo([]);
    } else if (cntrlName === "vendor") {
      stateObj.account.vendorsTier2 = null;
      stateObj.account.client = null;
      stateObj.account.project = null;
      vendorsTier2.errorObject.isValid = true;
      vendorsTier2.errorObject.errorMessage = "";
      if (id !== 0)
        getVendors(id);
      else {
        setvendorsTier2([]);
        setClients([]);
        setProjects([]);
      }
    }
    else if (cntrlName === "vendorsTier2") {
      stateObj.account.client = null;
      stateObj.account.project = null;
      if (id !== 0)
        getClients(id);
      else {
        setClients([]);
        setProjects([]);
      }
    }
    else if (cntrlName === "client") {
      stateObj.account.project = null;
      if (id !== 0)
        getProjects(id);
      else
        setProjects([]);
    }
    console.log(vendorsTier2, cntrlName, value);

    setError({
      ...stateObj,
      error: { ...error, [cntrlName]: { errorObject }, vendorsTier2 },
      account: { ...account, [cntrlName]: value },
    });
  };
  const onDatePickerChanged = (cntrlName, value) => {
    const { error, account } = stateObj;
    const validationObj = error[cntrlName];

    const { errorObject } = checkValidity(value, cntrlName, validationObj);
    setError({
      ...stateObj,
      error: { ...error, [cntrlName]: { errorObject } },
      account: { ...account, [cntrlName]: value },
    });
  };
  const onSubmitHandler = (isDraft) => {
    const { error, account } = stateObj;
    let result = true;
    for (let err in error) {
      const value = account[err];
      const name = err;
      const validationObj = error[name];
      let { errorObject } = checkValidity(value, name, validationObj);

      if (name !== "vendorsTier2" || isVendorTier2Disabled === false) {

        if (errorObject.errorMessage.trim() !== "") {
          result = false;
        }
      }
      else if (isVendorTier2Disabled === true) {
        errorObject.isValid = true;
        errorObject.errorMessage = "";
        //result = true;
      }



      error[name] = { errorObject };
    }
    console.log(account);
    setError({ account, error: error });
    if (result === true) {
      account.saveAsDraft = isDraft;
      props.setEmployeeDetails(account);
    }
  };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="employeeId"
            label="Employee Id"
            name="employeeId"
            autoComplete="employeeId"
            error={!stateObj.error.employeeId.errorObject.isValid}
            helperText={stateObj.error.employeeId.errorObject.errorMessage}
            onChange={changeHandler}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              maxLength: 12,
            }}
            autoFocus
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            value={stateObj.account.designation}
            onChange={(event, newValue) => {
              onDropdownChangeHandler("designation", newValue);
            }}
            getOptionLabel={(option) => {
              return option.designation_name;
            }}
            id="ddlDesination"
            options={designations}
            margin="normal"
            fullWidth
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  error={!stateObj.error.designation.errorObject.isValid}
                  helperText={
                    stateObj.error.designation.errorObject.errorMessage
                  }
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
                  label="Select Designation"
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
        <Grid item xs={4}>
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

        <Grid item xs={4}>
          <Autocomplete
            value={stateObj.account.project}
            onChange={(event, newValue) => {
              onDropdownChangeHandler("project", newValue);
            }}
            getOptionLabel={(option) => {
              return option.project_name;
            }}
            id="controllable-states-demo"
            name="project"
            options={projects}
            margin="normal"
            fullWidth
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  error={!stateObj.error.project.errorObject.isValid}
                  helperText={stateObj.error.project.errorObject.errorMessage}
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
                  label="Select Project"
                  variant="outlined"
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            value={stateObj.account.department}
            onChange={(event, newValue) => {
              onDropdownChangeHandler("department", newValue);
            }}
            getOptionLabel={(option) => {
              return option.department;
            }}
            id="controllable-states-demo"
            name="department"
            options={departments}
            margin="normal"
            fullWidth
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  error={!stateObj.error.department.errorObject.isValid}
                  helperText={
                    stateObj.error.department.errorObject.errorMessage
                  }
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
                  label="Select Department"
                  variant="outlined"
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            value={stateObj.account.reportingTo}
            onChange={(event, newValue) => {
              onDropdownChangeHandler("reportingTo", newValue);
            }}
            getOptionLabel={(option) => {
              return option.employee_name;
            }}
            id="controllable-states-demo"
            name="reportingTo"
            options={reportingTo}
            margin="normal"
            fullWidth
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  error={!stateObj.error.reportingTo.errorObject.isValid}
                  helperText={
                    stateObj.error.reportingTo.errorObject.errorMessage
                  }
                  name="reportingTo"
                  margin="normal"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Select Reporting To"
                  variant="outlined"
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            value={stateObj.account.taxTerms}
            onChange={(event, newValue) => {
              onDropdownChangeHandler("taxTerms", newValue);
            }}
            getOptionLabel={(option) => {
              return option.tax_type;
            }}
            id="controllable-states-demo"
            name="taxTerms"
            options={taxType}
            margin="normal"
            fullWidth
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  error={!stateObj.error.taxTerms.errorObject.isValid}
                  helperText={stateObj.error.taxTerms.errorObject.errorMessage}
                  name="taxTerms"
                  margin="normal"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Select Tax Terms"
                  variant="outlined"
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            value={stateObj.account.workAuth}
            onChange={(event, newValue) => {
              onDropdownChangeHandler("workAuth", newValue);
            }}
            getOptionLabel={(option) => {
              return option.work_auth_type;
            }}
            id="controllable-states-demo"
            name="workAuth"
            options={workAuthorization}
            margin="normal"
            fullWidth
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  error={!stateObj.error.workAuth.errorObject.isValid}
                  helperText={stateObj.error.workAuth.errorObject.errorMessage}
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
                  label="Select Work Authorization"
                  variant="outlined"
                />
              );
            }}
          />
        </Grid>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid item xs={4}>
            <KeyboardDatePicker
              margin="normal"
              inputVariant="outlined"
              fullWidth
              disableFuture
              id="date-picker-dialog"
              label="Employment Start Date"
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
          </Grid>
        </MuiPickersUtilsProvider>
        <Grid item xs={4}>
          <Autocomplete
            value={stateObj.account.billingStatus}
            onChange={(event, newValue) => {
              onDropdownChangeHandler("billingStatus", newValue);
            }}
            getOptionLabel={(option) => {
              return option.status;
            }}
            id="controllable-states-demo"
            name="billingStatus"
            options={billingStatus}
            margin="normal"
            fullWidth
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  error={!stateObj.error.billingStatus.errorObject.isValid}
                  helperText={
                    stateObj.error.billingStatus.errorObject.errorMessage
                  }
                  name="billingStatus"
                  margin="normal"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Select Billing Status"
                  variant="outlined"
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="wageRate"
            label="Wage Rate"
            name="wageRate"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputComponent: MoneyInput,
            }}
            inputProps={{
              maxLength: 8,
            }}
            onChange={changeHandler}
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            value={stateObj.account.wageCycle}
            onChange={(event, newValue) => {
              onDropdownChangeHandler("wageCycle", newValue);
            }}
            getOptionLabel={(option) => {
              return option.time_cycle;
            }}
            id="controllable-states-demo"
            name="wageCycle"
            options={wageCycle}
            margin="normal"
            fullWidth
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  error={!stateObj.error.wageCycle.errorObject.isValid}
                  helperText={stateObj.error.wageCycle.errorObject.errorMessage}
                  name="wageCycle"
                  margin="normal"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Select Wage Cycle"
                  variant="outlined"
                />
              );
            }}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          item
          xs={12}
          lg={12}
          md={12}
          className="formBtnHolder"
          style={{ textAlign: "center" }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            onClick={() => onSubmitHandler(1)}
          >
            Save as draft
          </Button>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            onClick={() => onSubmitHandler(0)}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
