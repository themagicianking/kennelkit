import { render } from "@testing-library/react";
import { AllPetsList } from "./AllPetsList";
const baseURL = import.meta.env.VITE_API_URL;

describe("All Pets List", () => {
  const list = render(<AllPetsList baseURL={baseURL} />);
  it("renders the list", () => {
    expect(list);
  });
});
