import { render, screen } from "@testing-library/react";

import App from "./App";
import { BrowserRouter } from "react-router-dom";

describe("App", () => {
  it("renders headline", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    screen.debug();
  });
});
