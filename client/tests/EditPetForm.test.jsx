// to do: figure out how to test for default information rendering without props

import { render } from "@testing-library/react";
import { EditPetForm } from "../src/components/pet-components/EditPetForm";
const baseURL = import.meta.env.VITE_API_URL;

describe("Edit Pet Form", () => {
  const form = render(<EditPetForm baseURL={baseURL} />);
  it("renders the form", () => {
    expect(form);
  });
});