import { render } from "@testing-library/react";
import { Homepage } from "./Homepage";

describe("Homepage", () => {
  const page = render(<Homepage />);
  it("renders the page", () => {
    expect(page);
  });
});