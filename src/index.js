import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux"
import store from "./redux/store"
import DialogProvider from "./DialogProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <DialogProvider>
            <HashRouter basename="/">
                <App />
            </HashRouter>
        </DialogProvider>
    </Provider>
);