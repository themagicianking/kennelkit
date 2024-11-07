import { render } from "@testing-library/react";
import { Navbar } from "../src/components/Navbar";

describe("Navbar", () => {
  const navbar = render(<Navbar />);
  it("renders the navbar", () => {
    expect(navbar);
  });
});
