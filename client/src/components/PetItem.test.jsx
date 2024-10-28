import { render } from "@testing-library/react";
import { PetItem } from "./PetItem";

let maleDog = {
  id: 1,
  checkedin: true,
  petname: "name",
  sex: "male",
  species: "dog",
};

let femaleCat = {
  id: 2,
  checkedin: false,
  petname: "name",
  sex: "female",
  species: "cat",
};

describe("Pet Item", () => {
  const maleDogListItem = render(<PetItem pet={maleDog} />);
  const femaleCatListItem = render(<PetItem pet={femaleCat} />);
  const maleSexIcon = maleDogListItem.container.querySelector("#sex-icon");
  const femaleSexIcon = femaleCatListItem.container.querySelector("#sex-icon");
  const catIcon = femaleCatListItem.container.querySelector("#species-icon");
  const dogIcon = maleDogListItem.container.querySelector("#species-icon");

  it("renders the item", () => {
    expect(maleDogListItem);
  });

  it("renders the correct species icon", () => {
    expect(catIcon.classList.contains("fa-cat")).toBe(true);
    expect(dogIcon.classList.contains("fa-dog")).toBe(true);
  });

  it("renders the correct sex icon", () => {
    expect(maleSexIcon.classList.contains("fa-mars")).toBe(true);
    expect(femaleSexIcon.classList.contains("fa-venus")).toBe(true);
  });
  // screen.debug();
});
