export const WEB_URL = "https://material-ui.com/";

export const WEB_API_URL = "http://localhost:3000";
export const WEBSITE_NAME = 'Account Chex';
//Page Path
export const PAGE_PATH = {
    forgotPassword: "/forgotpassword",
    login: "/",
    employee: "/manageemployee",
    project: "/manageproject",
    vendor: "/managevendor",
    client: "/manageclient",
    timesheet: "/managetimesheet",
    dashboard: "/managedashboard",
    createProject: "/createproject",
    createEmployee: "/createemployee",
    createClient: "/createclient",
    createVendor: "/createvendor",
    createTimesheet: "/createtimesheet",
    manageAccount:"/manageaccount",
    createRole:"/createrole",
    createUser:"/createuser"
}

//Page Name
export const PAGE_NAME = {
    forgotPassword: "Forgot Password",
    login: "Login",
    employee: "Employee",
    client: "Client",
    vendor: "Vendor",
    project: "Project",
    timesheet: "Timesheet",
    dashboard: "Dashboard",
    createProject: "Create Project",
    createEmployee: "Create Employee",
    createClient: "Create Client",
    createVendor: "Create Vendor",
    createTimesheet: "Create Timesheet",
    manageAccount:"Manage Account",
    createRole:"Create Role",
    createUser:"Create User"
}
//API PATH
export const API_PATH = {
    GET_COUNTRY: '/country',
    GET_PARENT_VENDOR: '/vendor/parent',
    GET_STATE: '/state/',
    GET_CITY: '/city/',
    GET_BILLING_STATUS: '/dropdown/employee?downType=GET_STATUS',
    GET_TAX_TYPE: '/dropdown/employee?downType=GET_TAX_TYPE',
    GET_WORK_AUTHORIZATION: '/dropdown/employee?downType=GET_WORK_AUTHORIZATION',
    GET_DESIGNATION: '/dropdown/employee?downType=GET_DESIGNATION',
    GET_DEPARTMENTS: '/dropdown/employee?downType=GET_DEPARTMENTS',
    GET_WAGE_CYCLE: '/dropdown/employee?downType=GET_WAGE_CYCLE',
    GET_CLIENT_BY_VENDOR_ID: 'dropdown/client?vendorId=',
    GET_GENDER: '/dropdown/employee?downType=GET_GENDER',    
    GET_REPORTINGTO: '/dropdown/reportingto?organizationId=1&departmentId=',
    GET_VENDOR: 'dropdown/vendor?accountId=',
    GET_PROJECT: '/dropdown/project?vendorId=',
    GET_DRAFT_EMPLOYEE: 'employee?userId=${userId}&isDraft=1',
    GET_PROJECTS: 'project',
    DELETE_PROJECT: 'project/',
    GET_VENDORS: 'vendor',
    GET_CLIENTS: 'client',
    DELETE_CLIENT: 'client/',
    DELETE_VENDOR: 'vendor/',
    CREATE_VENDOR: 'vendor',
    GET_EMPLOYEEDETAIL: 'employee/${employeeId}',
    CREATE_CLIENT: 'client',
    GET_VENDOR_DETAIL: 'vendor/${vendorId}',
    GET_PROJECT_DETAIL: 'project/${projectId}',
    GET_MANAGER: 'dropdown/manager',
    CREATE_PROJECT: 'project',
    GET_CLIENT_DETAIL: 'client/${clientId}',
    SAVE_EMPLOYEE_DETAIL: '/employee',
    GET_CURRENCY:"/dropdowns/currency",
    GET_ORGANIZATION:"/dropdowns/organizationtype",
    GET_FREQUENCY:"/dropdowns/frequecny",
    GET_ACCOUNTTYPE:"/dropdowns/accountype",
    GET_PARENTACCOUNT:"/account/parentaccount",
    GET_BILLING_DATES:"/dropdowns/billingdate",
    CREATE_ACCOUNT:"/account"
}
export const emailRegularExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const urlRegularExp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;