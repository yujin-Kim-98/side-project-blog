import React from "react";
import MyRouter from "./routes/Router";
import { Provider } from "react-redux";
import store from "./store";
import { Router } from "react-router";
import history from "./utils/history";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/custom.scss";

const App = () => {
    return (
        <Provider store={store}>
            <Router history={history}>
                <MyRouter />
            </Router>
        </Provider>
    )
};

export default App;
