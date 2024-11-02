/* eslint-disable no-undef */
// to do: figure out how to test for default information rendering without props

import { render, screen } from "@testing-library/react";
import { EditPetForm } from "../src/components/pet-components/EditPetForm";

let pet = {
  petname: "Spot",
  sex: "male",
  altered: "false",
  species: "dog",
  breed: "Siberian Husky",
  weight: 45,
  physicaldesc: "White and silver with blue eyes.",
};

let owner = {
  firstname: "First",
  lastname: "Last",
  phone: "1234567890",
  email: "email@email.com",
};

describe("Edit Pet Form", () => {
  const form = render(<EditPetForm pet={pet} owner={owner} />);
  screen.debug();
  it("renders the form", () => {
    expect(form);
  });
});
