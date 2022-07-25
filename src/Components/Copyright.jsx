import React from "react";
import { Typography, Link } from "@material-ui/core";
import { WEB_URL, WEBSITE_NAME } from "./../Constants/config";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" target="_blank" href={WEB_URL}>
        {WEBSITE_NAME}
      </Link>
      {` ${new Date().getFullYear()}`}
    </Typography>
  );
};

export default Copyright;
