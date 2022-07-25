import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import PersonalInfo from "../ManageUsers/PersonalInfo";
import EmployementDetail from "./../ManageUsers/EmployementDetail";
import BorderLinearProgress from "../../../Components/lineprogress";
import httpService from "../../../API/HttpService/httpService";
import { API_PATH } from "../../../Constants/config";
import LoadingPage from '../../../Components/Control/LoadingPage';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "block",
    background: "#fff",
  },
  heading: {
    fontSize: "1.2rem",
    fontWeight: "300",
  },
}));
const ManageUser = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");
  const [isValidPersonalInfo, setisValidPersonalInfo] = React.useState(false);
  const [personalInfoData, setpersonalInfoData] = React.useState(null);
  const [employeeDetailData, setemployeeDetailData] = React.useState(null);
  const [progressBarValue, setprogressBarValue] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    if (panel === "panel2") {
      setprogressBarValue(50);
    }
    else {
      setprogressBarValue(0);
    }
  };
  useEffect(() => {
    if (employeeDetailData)
      saveEmployeeDetail();

  }, employeeDetailData)
  const setPersonalInfo = (panelName, objPersonalInfo, isValidPersonalInfo) => {
    setpersonalInfoData(objPersonalInfo);
    setExpanded(panelName);
    setisValidPersonalInfo(isValidPersonalInfo);
    if (isValidPersonalInfo)
      setprogressBarValue(50);
    else
      setprogressBarValue(0);
  };
  const setEmployeeDetails = (objEmployeeDetails) => {

    if (isValidPersonalInfo) {
      setemployeeDetailData(objEmployeeDetails);
      //saveEmployeeDetail();
    }
  };
  const saveEmployeeDetail = () => {
    setIsLoading(true);
    const employeeData = { ...employeeDetailData, ...personalInfoData };
    const objEmployee = {};


    objEmployee.userName = employeeData.employeeId;
    objEmployee.emailId = employeeData.email;
    objEmployee.firstName = employeeData.firstName;
    objEmployee.middleName = employeeData.middleName;
    objEmployee.lastName = employeeData.lastName;


    objEmployee.contactNumber = employeeData.phoneNumber;
    objEmployee.homeAddress = employeeData.homeAddress;
    objEmployee.address1 = employeeData.address1;
    objEmployee.address2 = employeeData.address2;
    objEmployee.gender = employeeData.gender.id;

    objEmployee.ssnNo = employeeData.ssnNo;
    objEmployee.dob = new Date(employeeData.dob).getTime();
    objEmployee.country = employeeData.country.id;
    objEmployee.state = employeeData.state.id;
    objEmployee.city = employeeData.city.id;

    objEmployee.zipCode = employeeData.zipCode;

    objEmployee.designation = employeeData.designation.id;

    objEmployee.projectId = employeeData.project.id;
    objEmployee.client = employeeData.client.id;
    objEmployee.vendor1 = employeeData.vendor.id;
    objEmployee.department = employeeData.department.id;

    objEmployee.reportingId = employeeData.reportingTo.id;
    objEmployee.taxTermsId = employeeData.taxTerms.id;
    objEmployee.workAuthId = employeeData.workAuth.id;
    objEmployee.status = employeeData.billingStatus.id;

    objEmployee.wageRate = employeeData.wageRate;
    objEmployee.wageCycle = employeeData.wageCycle.id;
    objEmployee.saveAsDraft = employeeData.saveAsDraft;
    objEmployee.vendor2 = employeeData.vendorsTier2 ? employeeData.vendorsTier2.id : '';

    objEmployee.startDate = new Date(employeeData.startDate).getTime();
    objEmployee.applicationKey = '19ab64ac-588e-11e6-85b9-fe984cc15272';
    httpService.post(`${API_PATH.SAVE_EMPLOYEE_DETAIL}`, objEmployee).then((res) => {
      setIsLoading(false)
    });
  }
  return (
    <React.Fragment>
      {
        isLoading === true ? <LoadingPage></LoadingPage> :
          (
            <Grid container>
              <Grid item xs={12} lg={12} sm={12}>
                <BorderLinearProgress variant="determinate" value={progressBarValue} />

                <Accordion
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                >
                  <AccordionSummary
                    expandIcon={expanded === "panel1" ? <RemoveIcon></RemoveIcon> : <AddIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography variant="h4" className={classes.heading}>
                      Personal Details
              </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <PersonalInfo setPersonalInfo={setPersonalInfo}></PersonalInfo>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel2"}
                  onChange={handleChange("panel2")}
                >
                  <AccordionSummary
                    expandIcon={expanded === "panel2" ? <RemoveIcon></RemoveIcon> : <AddIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                  >
                    <Typography className={classes.heading}>
                      Employment Details
              </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <EmployementDetail
                      setEmployeeDetails={setEmployeeDetails}
                    ></EmployementDetail>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          )
      }
    </React.Fragment>
  )
};

export default ManageUser;
