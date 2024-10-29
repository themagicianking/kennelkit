import { render } from "@testing-library/react";
import { CheckedInPetsList } from "./CheckedInPetsList";
const baseURL = import.meta.env.VITE_API_URL;

describe("Checked In Pets List", () => {
  const list = render(<CheckedInPetsList baseURL={baseURL} />);
  it("renders the list", () => {
    expect(list);
  });
});