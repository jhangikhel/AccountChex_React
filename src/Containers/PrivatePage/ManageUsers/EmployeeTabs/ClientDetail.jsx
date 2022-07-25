import React from 'react';
import TabColumns from '../../../../Components/Control/TabColumns';
import { Grid } from '@material-ui/core';
import { ClientDetailTabsKey } from './EmployeeTabsDetails';
import { useEffect } from 'react';
import { API_PATH } from '../../../../Constants/config';
import { fillTemplate } from '../../../../Shared/index';
import httpService from '../../../../API/HttpService/httpService';
import LoadingTabs from '../../../../Components/Control/LoadingTabs';

const ClientDetail = ({ clientId }) => {
    let fillTemp = fillTemplate(API_PATH.GET_CLIENT_DETAIL, "clientId");
    const [clientDetail, setclientDetail] = React.useState(null);
    useEffect(() => {
        const apiPath = fillTemp(clientId);
        httpService.get(apiPath).then((res) => {
            setclientDetail(res.data[0]);
        });
    }, [clientId])
    return (
        <React.Fragment>
            {clientDetail ?
                <Grid container spacing={4}>
                    {
                        ClientDetailTabsKey.map(({ key, label }, index) => {
                            return <TabColumns key={index} value={clientDetail[key]} label={label} />
                        })
                    }
                </Grid>
                : <LoadingTabs></LoadingTabs>
            }
        </React.Fragment>
    )
};

export default ClientDetail;