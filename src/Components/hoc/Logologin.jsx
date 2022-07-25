import React from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Box, Grid } from "@material-ui/core";
import Logoimg from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

const styles = (theme) => ({
  Logo: {
    margin: "auto",
    display: "block",
  },
});

class Logologin extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Box
        style={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          width: "100%",
          margin: "10px 0px",
        }}
      >
        <Link href="/">
          <img src={Logoimg} alt="logo" className={classes.Logo} />
        </Link>
      </Box>
    );
  }
}

//export default Splitter;
export default withStyles(styles)(Logologin);
