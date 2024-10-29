import { render } from "@testing-library/react";
import { Navbar } from "./Navbar";

describe("Navbar", () => {
  const navbar = render(<Navbar />);
  it("renders the navbar", () => {
    expect(navbar);
  });
});
