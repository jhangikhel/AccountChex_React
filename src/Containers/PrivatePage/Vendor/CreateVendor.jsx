import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import AddVendor from "./AddVendor";

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
const CreateVendor = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");
  const [personalInfoData, setpersonalInfoData] = React.useState(null);
  const [employeeDetailData, setemployeeDetailData] = React.useState(null);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const setPersonalInfo = (panelName, objPersonalInfo) => {
    setExpanded(panelName);
    setpersonalInfoData(objPersonalInfo);
  };
  const setEmployeeDetails = (objEmployeeDetails) => {
    setemployeeDetailData(objEmployeeDetails);
  };
  return (
    <>
      <AddVendor setPersonalInfo={setPersonalInfo}></AddVendor>
    </>
  );
};

export default CreateVendor;
