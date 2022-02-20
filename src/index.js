import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

import { SpotifyContextProvider } from "./store/context";

ReactDOM.render(
  <BrowserRouter>
    <SpotifyContextProvider>
      <App />
    </SpotifyContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
