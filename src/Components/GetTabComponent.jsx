import React from 'react';
import PersonalInfo from './../Containers/PrivatePage/ManageUsers/EmployeeTabs/PersonalInfo';
import ComingSoon from './Control/ComingSoon';
import EmployeeDetails from './../Containers/PrivatePage/ManageUsers/EmployeeTabs/EmployeeDetails';
import VendorDetail from './../Containers/PrivatePage/ManageUsers/EmployeeTabs/VendorDetail';
import ProjectDetail from './../Containers/PrivatePage/ManageUsers/EmployeeTabs/ProjectDetail';
import ClientDetail from './../Containers/PrivatePage/ManageUsers/EmployeeTabs/ClientDetail';

const GetTabComponent = ({ id, detailId, vendorId, projectId, clientId }) => {
    const getComponent = ((index) => {
        switch (index) {
            case 1:
                return <PersonalInfo employeeId={detailId}></PersonalInfo>;
            case 2:
                return <EmployeeDetails employeeId={detailId}></EmployeeDetails>;
            case 3:
                return <VendorDetail vendorId={vendorId}></VendorDetail>;
            case 4:
                return <ClientDetail clientId={clientId}></ClientDetail>;
            case 5:
                return <ProjectDetail projectId={projectId}></ProjectDetail>;
            default:
                return <ComingSoon></ComingSoon>;
        }
    })
    return (
        <div>
            {getComponent(id)}
        </div>
    );
};

export default GetTabComponent;