import React from 'react';
import { Grid } from '@material-ui/core';

const TabColumns = ({ label = "", value = "" }) => {
    return (
        <React.Fragment >
            <Grid item xs={6} sm={6} md={2} lg={2}>
                {label}
            </Grid>
            <Grid item xs={6} sm={6} md={2} lg={2}>
                {value}
            </Grid>
        </React.Fragment>
    );
};

export default TabColumns;