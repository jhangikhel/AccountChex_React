import React from 'react';
import TabColumns from './../../../../Components/Control/TabColumns';
import { Grid } from '@material-ui/core';
import { EmployeeDetailTabsKey } from './EmployeeTabsDetails';
import { useEffect } from 'react';
import { API_PATH } from '../../../../Constants/config';
import { EPOCTODATETIME, fillTemplate, currenyFormatter } from './../../../../Shared/index';
import httpService from '../../../../API/HttpService/httpService';
import LoadingTabs from './../../../../Components/Control/LoadingTabs';

const EmployeeDetails = ({ employeeId }) => {
    let fillTemp = fillTemplate(API_PATH.GET_EMPLOYEEDETAIL, "employeeId");
    const [employeeDetail, setemployeeDetail] = React.useState(null);
    useEffect(() => {
        const apiPath = fillTemp(employeeId);
        httpService.get(apiPath).then((res) => {
            res.data[0].emp_start_date = EPOCTODATETIME(res.data[0].emp_start_date);
            res.data[0].wage_rate = currenyFormatter(res.data[0].wage_rate);
            setemployeeDetail(res.data[0]);
        });
    }, [employeeId])
    return (
        <React.Fragment>
            {employeeDetail ?
                <Grid container spacing={4}>
                    {
                        EmployeeDetailTabsKey.map(({ key, label }, index) => {
                            return <TabColumns key={index} value={employeeDetail[key]} label={label} />
                        })
                    }
                </Grid>
                : <LoadingTabs></LoadingTabs>
            }
        </React.Fragment>
    )
};

export default EmployeeDetails;