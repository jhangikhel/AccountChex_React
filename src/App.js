import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./Containers/Login";
import { PAGE_PATH } from "./Constants/config";
import ForgotPassword from "./Containers/ForgotPassword";
import WithPrivate from "./Components/hoc/WithPrivate";
import ManageUser from "./Containers/PrivatePage/Admin/ManageUser";
import ManageEmployee from "./Containers/PrivatePage/Admin/ManageEmployee";
import ManageProject from "./Containers/PrivatePage/Project/ManageProject";
import ManageVendor from "./Containers/PrivatePage/Vendor/ManageVendor";
import ManageClient from "./Containers/PrivatePage/Client/ManageClient";
import ChangePassword from "./Containers/PrivatePage/Admin/ChangePassword";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./config/theme";
import CreateProject from './Containers/PrivatePage/Project/CreateProject';
import CreateClient from './Containers/PrivatePage/Client/CreateClient';
import CreateVendor from './Containers/PrivatePage/Vendor/CreateVendor';
import ManageTimesheet from "./Containers/PrivatePage/Timesheet/ManageTimesheet";
import CreateTimesheet from "./Containers/PrivatePage/Timesheet/CreateTimesheet";
import ManageAccount from "./Containers/PrivatePage/Admin/ManageAcount";
import CreateRole from "./Containers/PrivatePage/Role/CreateRole/CreateRole";
class App extends Component {

  render() {

    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path={PAGE_PATH.login}>
              <Login {...this.props} />
            </Route>
            <Route exact path={PAGE_PATH.forgotPassword}>
              <ForgotPassword {...this.props} />
            </Route>
            <WithPrivate
              path="/manageaccount"
              component={ManageAccount}
            ></WithPrivate>
            <WithPrivate
              path={PAGE_PATH.createRole}
              component={CreateRole}
            ></WithPrivate>
            <WithPrivate
              path="/manageemployee"
              component={ManageEmployee}
            ></WithPrivate>
            <WithPrivate
              path="/manageproject"
              component={ManageProject}
            ></WithPrivate>
            <WithPrivate
              path="/manageclient"
              component={ManageClient}
            ></WithPrivate>
            <WithPrivate
              path="/managevendor"
              component={ManageVendor}
            ></WithPrivate>
            <WithPrivate
              path="/managetimesheet"
              component={ManageTimesheet}
            ></WithPrivate>
            <WithPrivate
              path="/createemployee"
              component={ManageUser}
            ></WithPrivate>
            <WithPrivate
              path="/createproject"
              component={CreateProject}
            ></WithPrivate>
            <WithPrivate
              path="/createtimesheet"
              component={CreateTimesheet}
            ></WithPrivate>
            <WithPrivate
              path="/createclient"
              component={CreateClient}
            ></WithPrivate>
            <WithPrivate
              path="/createvendor"
              component={CreateVendor}
            ></WithPrivate>

            <WithPrivate
              path="/changepassword"
              component={ChangePassword}
            ></WithPrivate>


          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default hot(module)(App);
