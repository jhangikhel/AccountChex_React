import React from 'react';
import TabColumns from './../../../../Components/Control/TabColumns';
import { Grid } from '@material-ui/core';
import { PersonalInfoTabsKey } from './EmployeeTabsDetails';
import { useEffect } from 'react';
import { API_PATH } from '../../../../Constants/config';
import { EPOCTODATETIME, fillTemplate } from './../../../../Shared/index';
import httpService from '../../../../API/HttpService/httpService';
import LoadingTabs from './../../../../Components/Control/LoadingTabs';
const PersonalInfo = ({ employeeId }) => {
    let fillTemp = fillTemplate(API_PATH.GET_EMPLOYEEDETAIL, "employeeId");
    const [employeePersonalDetail, setemployeePersonalDetail] = React.useState(null);
    useEffect(() => {
        const apiPath = fillTemp(employeeId);
        httpService.get(apiPath).then((res) => {
            res.data[0].date_of_birth = EPOCTODATETIME(res.data[0].date_of_birth);
            setemployeePersonalDetail(res.data[0]);

        });
    }, [employeeId])
    return (
        <React.Fragment>
            {employeePersonalDetail ?
                <Grid container spacing={4}>
                    {
                        PersonalInfoTabsKey.map(({ key, value, label }, index) => {
                            return <TabColumns key={index} value={employeePersonalDetail[key]} label={label} />
                        })
                    }


                </Grid>
                : <LoadingTabs></LoadingTabs>
            }
        </React.Fragment>
    )

};

export default PersonalInfo;