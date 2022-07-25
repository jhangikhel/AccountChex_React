import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar, Link } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import { Grid } from "@material-ui/core";
import { WEBSITE_NAME, WEB_URL } from './../Constants/config';

const useStyles = makeStyles(theme => ({
    text: {
        padding: theme.spacing(2, 0, 0, 10)
    },
    subheader: {
        backgroundColor: theme.palette.background.paper
    },
    appBar: {
        top: "auto",
        bottom: 0,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: "#29b6f6"
    },
    grow: {
        flexGrow: 1
    },

}));

export default function Footer() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="open drawer" />
                    <div className={classes.grow} />
                    <Grid container direction="row" justify="center" alignItems="center">
                        {'Copyright © '}
                        <Link color="inherit" target="_blank" href={WEB_URL}>
                            {` ${new Date().getFullYear()}`}
                        </Link>
                    </Grid>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}
