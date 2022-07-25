import React from "react";
import {
  Avatar,
  Container,
  Typography,
  Checkbox,
  Grid,
  Link as MatLink,
  Box,
} from "@material-ui/core";
import {
  LockOutlined,
  LockIcon,
  InputOutlined,
  Palette,
} from "@material-ui/icons";
import { makeStyles, Theme } from "@material-ui/core/styles";
import theme from "../../config/theme";
import Copyright from "./../Copyright";
import { Link } from "react-router-dom";
import { PAGE_PATH } from "./../../Constants/config";
import Logo from "../hoc/Logo";
import Logologin from "./Logologin";

const useStyles = makeStyles((theme) => ({
  subLoginText: {
    fontSize: "12px",
    textAlign: "left",
    display: "block",
    fontWeight: 300,
    color: "#707070",
  },
}));
const WithPublic = (props) => {
  const classes = useStyles();
  const { heading, pageLink, pageName, subTitle } = props;
  return (
    <Grid container item={true} lg={12}>
      <Logologin />
      <Grid item xs={12} md={12} lg={12}>
        <Typography color="primary" variant="h2">
          {heading}
        </Typography>
        {subTitle && (
          <Typography
            component="span"
            className={classes.subLoginText}
            variant="subtitle1"
          >
            {subTitle}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        {props.children}
      </Grid>
      <Grid container>
        <Grid item xs>
          <Link
            color="primary"
            style={{ fontSize: "14px", fontWeight: "500" }}
            to={pageLink}
          >
            {pageName}
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WithPublic;
