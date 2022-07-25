import React from "react";
import clsx from "clsx";
import {
  makeStyles,
  withStyles,
  Toolbar,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core/styles";
import { Drawer } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
const drawerWidth = 240;
const styles = (theme) => ({
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
});

const [open, setOpen] = React.useState(false);
const [anchorEl, setAnchorEl] = React.useState(false);
const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(false);
const [value, setValue] = React.useState(0);

const isMenuOpen = anchorEl;
const isMobileMenuOpen = mobileMoreAnchorEl;

const handleProfileMenuOpen = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleMobileMenuClose = () => {
  setMobileMoreAnchorEl(false);
};

const handleMenuClose = () => {
  setAnchorEl(false);
  handleMobileMenuClose();
};

const handleDrawerOpen = () => {
  setOpen(true);
};
const redirectToPage = () => {
  history.push("/manageuser");
};
const handleDrawerClose = () => {
  setOpen(false);
};
const menuId = "primary-search-account-menu";
class Mainmenu extends React.Component {
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
export default withStyles(styles)(Mainmenu);
