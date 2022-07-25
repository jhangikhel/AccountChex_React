import React, { useEffect } from "react";
import httpService from "../../../API/HttpService/httpService";
import TableControl from "../../../Components/Control/TableControl";
import { API_PATH } from "../../../Constants/config";
import { fillTemplate } from './../../../Shared/index';
import { EmployeeTableView } from './../ManageUsers/EmployeeTabs/EmployeeTabsDetails';
export default function ManageEmployee() {
  const userId = 1;
  let fillTemp = fillTemplate(API_PATH.GET_DRAFT_EMPLOYEE, "userId");
  const [rows, setRowData] = React.useState(null);
  const getEmployee = (pageNoIndex, limit, offset) => {
    const apiPath = fillTemp(userId);
    httpService.get(apiPath).then((res) => {

      let responseData = res.data.map(row => {

        row.address = `${row.home_address} ${row.address_1} ${row.address_2}`;
        row.name = `${row.first_name} ${row.middle_name} ${row.last_name}`;

        return row;
      });

      setRowData(responseData);
    });
  }
  useEffect(() => {
    getEmployee(0, 20, 0)
  }, []);
  return (
    <React.Fragment>
      <TableControl rowData={rows}
        getData={getEmployee}
        columnsToView={EmployeeTableView}
        id1="employee_id"
        id2="vendor_tier_1_id"
        id3="project_id"
        id4="client_id"></TableControl>
    </React.Fragment>
  )
}
