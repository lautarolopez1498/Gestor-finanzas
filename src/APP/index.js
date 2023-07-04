import React from "react";
import { render } from "react-dom";
import { createRoot } from "react-dom/client";

import App from "./App";

render(<App />, document.getElementById("app"));
// createRoot(document.getElementById("root")).render(<App />);
