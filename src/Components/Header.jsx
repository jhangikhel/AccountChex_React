import React, { useState, useEffect } from "react";
import clsx from "clsx";

import {
  fade,
  createStyles,
  makeStyles,
  useTheme,
  Theme,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Breadcrumbs,
  Paper,
  Grid,
  Link,
  Box,
} from "@material-ui/core";
import theme from "../config/theme";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { WEBSITE_NAME } from "../Constants/config";
import { useHistory, useLocation, NavLink } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Usernav from "../Components/Usernav";
import Logo from "./hoc/Logo";
import { menuBar, getMenuIcon } from "../Shared";
import { SvgIcon } from "./SvgIcon";
import Footer from './Footer';

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
  createStyles({
    listIcon: {
      minWidth: "46px",
      display: "flex",
      justifyContent: "center",
      height: "35px",
      alignItems: "center",
      marginRight: "12px",
    },
    listText: {
      minWidth: "40px",
      display: "flex",
      height: "35px",
      alignItems: "center",
     },

    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      background: " #80d6d0",
      background:
        "-moz-linear-gradient(left,  #d8fefa 0%, #d8fefa 64%, #80d6d0 100%)",
      background:
        "-webkit-linear-gradient(left,  #d8fefa 0%,#d8fefa 64%,#80d6d0 100%)",
      background:
        "linear-gradient(to right,  #d8fefa 0%,#d8fefa 64%,#80d6d0 100%)",
    },

    appBarShift: {
      //  marginLeft: drawerWidth,
      // width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginLeft: 20,
    },

    hide: {
      // display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
      paddingBottom: "60px",
    },
    drawerOpen: {
      width: drawerWidth,
      paddingBottom: "60px",
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
    content: {
      display: "flex",
      flexGrow: "1",
      padding: theme.spacing(1),
      paddingTop: "40px",
      // marginLeft: drawerWidth,
      marginBottom: theme.spacing(2),
    },
    footer: {
      backgroundColor: "#444",
      // marginTop: theme.spacing(8),
      padding: theme.spacing(1, 0),
      position: "fixed",
      bottom: "0px",
      left: 0,
      paddingLeft: drawerWidth,
      width: "100%",
      textAlign: "right",
      paddingRight: "15px",
      zIndex: "99",
      color: "#fff",
    },

    menuItems:{
        display:"flex",
        justifyCcontent: "flex-start",
        paddingLeft: "16px",
        fontSize: "16px",
        color: "#757575",
        alignItems: "center",
        textDecoration:"none",

        "&:hover":{
          color: "#000",
          textDecoration:"none",
        },
    },
    footerroot: {
      marginBottom: theme.spacing(8),
      bottom: 0,
    },
  })
);

export default function MiniDrawer(props) {
  const classes = useStyles();
  const location = useLocation();
  console.log(location);
  const theme = useTheme();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [heading, setHeading] = useState("");

  const isMenuOpen = anchorEl;
  const isMobileMenuOpen = mobileMoreAnchorEl;

  useEffect(() => {
    const currentLocation = location.pathname;
    const { pageName } = menuBar.find(
      ({ pagePath }) => pagePath == currentLocation
    );

    setHeading(pageName);
  }, [location]);

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
    setOpen(!open);
  };
  const redirectToPage = (pagePath) => {
    history.push(pagePath);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const menuId = "primary-search-account-menu";

  return (
    <div>
      <div className={classes.root}>
        <AppBar
          color="secondary"
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Grid container>
            <Grid item lg={3} item>
              <Toolbar>
                {" "}
                <Logo />
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, {
                    [classes.hide]: open,
                  })}
                >
                  <MenuIcon className="textBlack" />
                </IconButton>
              </Toolbar>
            </Grid>
            <Grid item lg={5}>
              <Grid container>
                <Grid item lg={3} sm={3} xs={3}></Grid>
                <Grid item lg={9} sm={9} xs={9}>
                  <Toolbar>
                    <Paper
                      style={{
                        height: "40px",
                        width: "100%",
                        boxShadow: "none",
                        position: "relative",
                      }}
                    >
                      <InputBase
                        style={{
                          width: "100%",
                          padding: "0px 15px",
                          height: 40,
                          border: "1px #afece7 solid",
                          borderRadius: "3px",
                          color: "#000"
                        }}
                        placeholder="Search"
                        inputProps={{ "aria-label": "search" }}
                      />
                      <IconButton
                        type="submit"
                        aria-label="search"
                        style={{
                          position: "absolute",
                          top: "1px",
                          right: "1px",
                          padding: "8px",
                        }}
                      >
                        <SearchIcon />
                      </IconButton>
                    </Paper>
                  </Toolbar>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={4}>
              <Toolbar
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <IconButton aria-label="upload picture">
                  <NotificationsNoneIcon className="textBlack" />
                </IconButton>
                <Usernav />
              </Toolbar>
            </Grid>
          </Grid>
        </AppBar>

        <main className={classes.content}>
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
              {menuBar.map((menuItem) =>
                menuItem.isMenuBar ? (
                  <NavLink
                  className={classes.menuItems}
                    key={menuItem.id}
                    to={menuItem.pagePath}
                    activeClassName="active"
                  //onClick={() => redirectToPage(menuItem.pagePath)}
                  >
                    <ListItemIcon className={classes.listIcon}>
                      {<SvgIcon pageId={menuItem.id} />}
                    </ListItemIcon>
                    <ListItemText
                      className={classes.listText}
                      primary={menuItem.pageName}
                    />
                  </NavLink>
                ) : (
                    ""
                  )
              )}
            </List>
          </Drawer>
          <Box
            boxShadow={0}
            className={classes.contentMain}
            style={{ width: "100%", paddingTop: "33px", marginBottom: "30px" }}
          >
            <Grid container>
              <Grid item xs={12} lg={12} md={12} sm={12}>
                <Box
                  className="breadcrumbsHolder"
                  boxShadow={0}
                  style={{ border: "1px #e4e4e4 solid" }}
                >
                  <Grid container>
                    <Grid item xs={12} lg={6} md={6} sm={12}>
                      <h2 className="pageTitle">{heading}</h2>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      lg={6}
                      md={6}
                      sm={12}
                      style={{ textAlign: "right" }}
                    >
                      {/* <Breadcrumbs
                        aria-label="breadcrumb"
                        style={{ display: "inline-block" }}
                      >
                        <Link color="inherit" href="#">
                          Home
                        </Link>
                        <Link color="inherit" href="#">
                          Core
                        </Link>
                        <Typography color="textPrimary">Breadcrumb</Typography>
                      </Breadcrumbs> */}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                lg={12}
                md={12}
                sm={12}
                style={{ background: "#fff" }}
              >
                <Box
                  p={2}
                  boxShadow={0}
                  style={{ border: "1px #e4e4e4 solid" }}
                >
                  {props.children}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </main >
        <Footer></Footer>
        {/* <Box className={classes.footer}> Copyright Reserved</Box> */}
      </div >
    </div >
  );
}
