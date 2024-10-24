import { render, screen } from "@testing-library/react";

import { PetItem } from "./PetItem";

let pet = {
  id: 1,
  checkedin: true,
  petname: "name",
  sex: "male",
  species: "dog",
};

describe("Pet Item", () => {
  it("renders correctly", () => {
    render(<PetItem pet={pet} />);

    screen.debug();
  });
});
