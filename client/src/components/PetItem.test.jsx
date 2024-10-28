import { render, screen } from "@testing-library/react";
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

describe("Renders the pet item correctly", () => {
  describe("renders male dog item correctly", () => {
    const maleDogListItem = render(<PetItem pet={maleDog} />);
    const dogSpeciesIcon = screen.getByTestId("list-dog-species-icon");
    const maleSexIcon = screen.getByTestId("list-male-sex-icon");

    it("renders the item", () => {
      expect(maleDogListItem);
    });
    it("renders the dog species icon", () => {
      expect(dogSpeciesIcon.classList.contains("fa-dog")).toBe(true);
    });
    it("renders the male sex icon", () => {
      expect(maleSexIcon.classList.contains("fa-mars")).toBe(true);
    });
  });

  describe("renders female cat item correctly", () => {
    const femaleCatListItem = render(<PetItem pet={femaleCat} />);
    const femaleSexIcon = screen.getByTestId("list-female-sex-icon");
    const catSpeciesIcon = screen.getByTestId("list-cat-species-icon");

    it("renders the item", () => {
      expect(femaleCatListItem);
    });

    it("renders the correct species icon", () => {
      expect(catSpeciesIcon.classList.contains("fa-cat")).toBe(true);
    });

    it("renders the correct sex icon", () => {
      expect(femaleSexIcon.classList.contains("fa-venus")).toBe(true);
    });
  });
});
