import { errorMessage } from './../Constants/errorMessage';
import { emailRegularExp, urlRegularExp, PAGE_PATH, PAGE_NAME } from './../Constants/config';
import moment from 'moment';
export function checkValidity(value, name, rules) {

    let isValid = false;
    const { errorObject } = rules;
    let errorMsg = "";
    if (errorObject.required === false) {
        isValid = true;
    }
    if (errorObject.isDropdown) {
        if (errorObject.required) {
            if (!value) {
                isValid = false;
                errorMsg = errorMessage[name];
            }
            else {
                isValid = true;
            }
        }
    }
    else if (errorObject.isDate) {
        if (errorObject.required) {
            const dateValue = Date.parse(value) ? new Date(value).toISOString() : null;
            if (!dateValue) {
                isValid = false;
                errorMsg = errorMessage[name];
            }
            else {
                isValid = true;
            }
        }
    }
    else {
        if (errorObject.required) {
            if (errorObject.isNumeric) {

                if (isNaN(value)) {

                    isValid = false;
                    errorMsg = `${errorMessage[`${name}`]}`;
                }
                else {
                    isValid = value >= 0;
                }
            }
            else {
                isValid = value.trim() !== '';
                if (!isValid)
                    errorMsg = errorMessage[name];
            }


        }

        if (errorObject.minLength && isValid == true) {
            isValid = value.length >= errorObject.minLength;
            console.log(isValid);
            if (!isValid)
                errorMsg = `${errorMessage[`${name}Minlength`]} ${errorObject.minLength}`;
        }
        if (errorObject.isEmail && isValid == true) {
            const patt = new RegExp(emailRegularExp);
            isValid = patt.test(value);
            if (!isValid)
                errorMsg = `${errorMessage[`${name}InValid`]}`;

        }
        if (errorObject.isURL && isValid == true) {
            const patt = new RegExp(urlRegularExp);
            isValid = patt.test(value);
            if (!isValid)
                errorMsg = `${errorMessage[`${name}InValid`]}`;

        }
    }

    if (!isValid) {
        rules = {
            ...rules, errorObject: { ...errorObject, errorMessage: errorMsg, isValid }
        }
    }
    else {
        rules = {
            ...rules, errorObject: { ...errorObject, errorMessage: "", isValid }
        }
    }
    return rules;
}
export const gender = [{ id: 'Male', value: 'Male' }, { id: 'Female', value: 'Female' }];
export const fillTemplate = function (templateString, templateVars) {
    return new Function(templateVars, "return `" + templateString + "`;");
}

export const menuBar = [
    //{id:1,pageName:PAGE_NAME.dashboard,pagePath:PAGE_PATH.dashboard},
    { id: 2, pageName: PAGE_NAME.createEmployee, pagePath: PAGE_PATH.createEmployee, isMenuBar: true },
    { id: 3, pageName: PAGE_NAME.createProject, pagePath: PAGE_PATH.createProject, isMenuBar: true },
    { id: 4, pageName: PAGE_NAME.vendor, pagePath: PAGE_PATH.vendor, isMenuBar: true },
    { id: 5, pageName: PAGE_NAME.createClient, pagePath: PAGE_PATH.createClient, isMenuBar: true },
    { id: 10, pageName: PAGE_NAME.createTimesheet, pagePath: PAGE_PATH.createTimesheet, isMenuBar: true },
    { id: 11, pageName: PAGE_NAME.createTimesheet, pagePath: PAGE_PATH.createTimesheet, isMenuBar: false },
    { id: 6, pageName: PAGE_NAME.createProject, pagePath: PAGE_PATH.createProject, isMenuBar: false },
    { id: 7, pageName: PAGE_NAME.createEmployee, pagePath: PAGE_PATH.createEmployee, isMenuBar: false },
    { id: 8, pageName: PAGE_NAME.createClient, pagePath: PAGE_PATH.createClient, isMenuBar: false },
    { id: 9, pageName: PAGE_NAME.createVendor, pagePath: PAGE_PATH.createVendor, isMenuBar: false }
];
export const DATEFORMAT = "YYYY-MM-DD";
export const EPOCTODATETIME = (epocDate) => {
    if (!epocDate) return;
    console.log(epocDate)
    return moment(epocDate).format(DATEFORMAT);
}
export const currenyFormatter = (value) => {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0,
        //maximumFractionDigits: 0,
    });
    console.log(formatter.format(value));
    formatter.format(value);
}