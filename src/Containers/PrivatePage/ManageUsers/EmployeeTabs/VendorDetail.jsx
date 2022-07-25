import React from 'react';
import TabColumns from '../../../../Components/Control/TabColumns';
import { Grid } from '@material-ui/core';
import { VendorDetailTabsKey } from './EmployeeTabsDetails';
import { useEffect } from 'react';
import { API_PATH } from '../../../../Constants/config';
import { fillTemplate } from '../../../../Shared/index';
import httpService from '../../../../API/HttpService/httpService';
import LoadingTabs from '../../../../Components/Control/LoadingTabs';

const VendorDetail = ({ vendorId }) => {
    let fillTemp = fillTemplate(API_PATH.GET_VENDOR_DETAIL, "vendorId");
    const [vendorDetail, setvendorDetail] = React.useState(null);
    useEffect(() => {
        const apiPath = fillTemp(vendorId);
        httpService.get(apiPath).then((res) => {
            setvendorDetail(res.data[0]);
        });
    }, [vendorId])
    return (
        <React.Fragment>
            {vendorDetail ?
                <Grid container spacing={4}>
                    {
                        VendorDetailTabsKey.map(({ key, value, label }, index) => {
                            return <TabColumns key={index} value={vendorDetail[key]} label={label} />
                        })
                    }
                </Grid>
                : <LoadingTabs></LoadingTabs>
            }
        </React.Fragment>
    )
};

export default VendorDetail;