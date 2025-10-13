import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./Redux/store.js";

createRoot(document.getElementById("root")).render(

    <BrowserRouter>
    <Provider store={store}>

      <App />
    </Provider>
    </BrowserRouter>

);

/**
 * <Provider> makes the Redux store available to your entire app.

Now any component can access or update the global state.
 */