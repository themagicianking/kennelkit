import { render } from "@testing-library/react";
import { Homepage } from "../src/components/Homepage";

describe("Homepage", () => {
  const page = render(<Homepage />);
  it("renders the page", () => {
    expect(page);
  });
});