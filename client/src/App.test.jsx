import { render, screen } from "@testing-library/react";

import App from "./App";
import { BrowserRouter } from "react-router-dom";

describe.skip("App", () => {
  it("renders the main app", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    screen.debug();
  });
});
