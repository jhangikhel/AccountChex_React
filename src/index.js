import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";

ReactDOM.render(
    <React.Fragment>
    <App />
        </React.Fragment>
    , document.getElementById("root"));

if (module.hot) {
    module.hot.accept()
}