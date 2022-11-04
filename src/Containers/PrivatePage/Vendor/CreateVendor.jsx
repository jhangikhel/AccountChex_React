import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import AddVendor from "./AddVendor";


const CreateVendor = () => {
 
  const setPersonalInfo = (panelName, objPersonalInfo) => {
    
  };
 
  return (
    <>
      <AddVendor setPersonalInfo={setPersonalInfo}></AddVendor>
    </>
  );
};

export default CreateVendor;
