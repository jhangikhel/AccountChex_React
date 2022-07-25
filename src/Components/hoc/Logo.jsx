import React from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Box, Grid } from "@material-ui/core";
import Logoimg from "../../assets/images/logo.png";

const styles = (theme) => ({
  Logo: {
    maxHeight: "35px",
  },
});

class Logo extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <a>
        <img src={Logoimg} alt="logo" className={classes.Logo} />
      </a>
    );
  }
}

//export default Splitter;
export default withStyles(styles)(Logo);
