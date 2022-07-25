import React from 'react';
import TabColumns from '../../../../Components/Control/TabColumns';
import { Grid } from '@material-ui/core';
import { ProjectDetailTabsKey } from './EmployeeTabsDetails';
import { useEffect } from 'react';
import { API_PATH } from '../../../../Constants/config';
import { EPOCTODATETIME, fillTemplate } from '../../../../Shared/index';
import httpService from '../../../../API/HttpService/httpService';
import LoadingTabs from '../../../../Components/Control/LoadingTabs';

const ProjectDetail = ({ projectId }) => {
    let fillTemp = fillTemplate(API_PATH.GET_PROJECT_DETAIL, "projectId");
    const [projectDetail, setProjectDetail] = React.useState(null);
    useEffect(() => {
        const apiPath = fillTemp(projectId);
        httpService.get(apiPath).then((res) => {
            res.data[0].project_start_date = EPOCTODATETIME(res.data[0].project_start_date);
            res.data[0].project_end_date = EPOCTODATETIME(res.data[0].project_end_date);
            setProjectDetail(res.data[0]);
        });
    }, [projectId])
    return (
        <React.Fragment>
            {projectDetail ?
                <Grid container spacing={4}>
                    {
                        ProjectDetailTabsKey.map(({ key, label }, index) => {
                            return <TabColumns key={index} value={projectDetail[key]} label={label} />
                        })
                    }
                </Grid>
                : <LoadingTabs></LoadingTabs>
            }
        </React.Fragment>
    )
};

export default ProjectDetail;