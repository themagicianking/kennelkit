// to do: figure out how to test for species and breeds render correctly without passing props to the form
// to do: fix bug where fetch does not work in testing
import { render } from "@testing-library/react";
import { CreatePetForm } from "../src/components/pet-components/CreatePetForm";
const baseURL = import.meta.env.VITE_API_URL;

describe("Create Pet Form", () => {
  const form = render(<CreatePetForm baseURL={baseURL} />);
  it("renders the form", () => {
    expect(form);
  });
});
