import { render } from "@testing-library/react";
import { CheckInToggle } from "./CheckInToggle";
const baseURL = import.meta.env.VITE_API_URL;

describe("Check In Toggle", () => {
  const toggle = render(<CheckInToggle baseURL={baseURL} id={"test"} checkedin={true}/>);
  it("renders the toggle", () => {
    expect(toggle);
  });
});