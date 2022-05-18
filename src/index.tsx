import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import store from "./store/index";
import { ThemeProvider } from "./theme/index";

const root = createRoot(document.getElementById("root")!);
root.render(
  <Router>
    <StoreProvider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StoreProvider>
  </Router>
);
