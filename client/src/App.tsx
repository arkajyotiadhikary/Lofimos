import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import Router from "./routes/Router";
export default function App() {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    );
}
