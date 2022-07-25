import React from "react";
import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";
import {
  Grid,
  Tab,
  Tabs,
  Typography,
  Divider,
  IconButton,
  Button,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  spliterinner: {
    flex: "1 1 auto",
    minWidth: "200px",
  },
  spliterinner2: {
    flex: "1 1 auto",
    minWidth: "200px",
  },
});

class Splitter extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["Manage Employee", "Starred", "Send email", "Drafts"].map(
            (text, index) => (
              <ListItem button key={text}>
                <ListItemIcon onClick={redirectToPage}>
                  {index % 2 === 0 ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="black"
                      width="24px"
                      height="24px"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7C15.12 7 14 8.12 14 9.5s1.12 2.5 2.5 2.5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5C7.34 5 6 6.34 6 8s1.34 3 3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V19h11v-2.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V19h7v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13z" />
                    </svg>
                  ) : (
                    <MailIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
        <Divider />
      </Drawer>
    );
  }
}

//export default Splitter;
export default withStyles(styles)(Splitter);
