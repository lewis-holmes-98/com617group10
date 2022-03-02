import React, { StrictMode } from "react";
import { hot } from "react-hot-loader/root";
import ReactDOM from "react-dom";
import App from "./App.js";

const render = (App) => ReactDOM.render(<App />, document.getElementById('app'));


render(hot(App));