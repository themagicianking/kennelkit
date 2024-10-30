import { render, screen } from "@testing-library/react";

import { App } from "../src/App";
import { BrowserRouter } from "react-router-dom";

describe("App", () => {
  it("renders the main app", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });
});
