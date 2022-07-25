const txtBoxMsg = "Please Enter ";
const ddlMsg = "Please Select ";

export const errorMessage = {
    email: `${txtBoxMsg}Email Id`,
    password: `${txtBoxMsg}Password`,
    passwordMinlength: "Please Enter a password of length greater than ",
    country: `${ddlMsg}Country`,
    state: `${ddlMsg}State`,
    city: `${ddlMsg}City`,
    firstName: `${txtBoxMsg}First Name`,
    lastName: `${txtBoxMsg}Last Name`,
    middleName: `${txtBoxMsg}Middle Name`,
    gender: `${ddlMsg}Gender`,
    ssnNo: `${txtBoxMsg}SSN No.`,
    homeAddress: `${txtBoxMsg}Home Address`,
    address1: `${txtBoxMsg}Address 1`,
    zipCode: `${txtBoxMsg}ZIP Code`,
    zipCodeMinlength: "ZIP Code should be of length ",
    phoneNumber: `${txtBoxMsg}Phone Number`,
    emailInValid: 'Email Id is not Valid',
    websiteURLInValid: 'Website URL is not Valid',
    ssnNoNegative: 'SSN No never be negative',
    ssnNoMinlength: "SSN Number should be of length ",
    dob: "Please Select Valid DOB",
    designation: `${ddlMsg}Designation`,
    project: `${ddlMsg}Project`,
    vendor: `${ddlMsg}Vendor`,
    vendorsTier2: `${ddlMsg}Vendor Tier 2`,
    department: `${ddlMsg}Department`,
    reportingTo: `${ddlMsg}Reporting To`,
    taxTerms: `${ddlMsg}Tax Terms`,
    workAuth: `${ddlMsg}Work Authorization`,
    billingStatus: `${ddlMsg}Billing Status`,
    wageCycle: `${ddlMsg}Wage Cycle`,
    wageRate: `${ddlMsg}Wage Rate`,
    projectTitle: `${txtBoxMsg}Project Title`,
    skills: `${txtBoxMsg}Skills`,
    accountManager: `${ddlMsg}Account Manager`,
    startDate: `${ddlMsg}Start Date`,
    endDate: `${ddlMsg}End Date`,
    client: `${ddlMsg}Client`,
    projectDescription: `${txtBoxMsg}Description`,
    working: `${txtBoxMsg}Working`,
    timesheetCycle: `${txtBoxMsg}Timesheet Cycle`,
    websiteURL: `${txtBoxMsg}Website URL`,
    emailId: `${txtBoxMsg}Email Id`,
    parentOrganization: `${txtBoxMsg}Parent Organization`,
    organizationName: `${txtBoxMsg}Organization Name`,
    vendorName: `${txtBoxMsg}Vendor Name`,
    boardNumber: `${txtBoxMsg}Board Number`,
    workAddress: `${txtBoxMsg}Work Address`,
    employeeId: `${txtBoxMsg}Employee Id`,
}

export const confirmationPopupMessages = {
    delete: "Are you sure you want to delete "
}

export const snackbarMessages = {
    deleteSuccess: "Delete Successfully !!",
    deleteError: "Error in Deletion!!",
    createSuccess: "Create Successfully !!",
    createError: "Error in Creation !!"
}
