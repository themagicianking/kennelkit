import { render, screen } from "@testing-library/react";
import { PetItem } from "./PetItem";

let maleDog = {
  id: 1,
  checkedin: true,
  petname: "Dog",
  sex: "male",
  species: "dog",
};

let femaleCat = {
  id: 2,
  checkedin: false,
  petname: "Cat",
  sex: "female",
  species: "cat",
};

describe("Renders the pet item correctly", () => {
  describe("renders male dog item correctly", () => {
    const dogItem = render(<PetItem pet={maleDog} id="dog" />);
    const speciesIcon = screen.getByTestId("list-species-icon");
    const sexIcon = screen.getByTestId("list-sex-icon");
    it("renders the dog item", () => {
      expect(dogItem);
    });
    it("renders the dog species icon", () => {
      expect(speciesIcon.classList.contains("fa-dog")).toBe(true);
    });
    it("renders the male sex icon", () => {
      expect(sexIcon.classList.contains("fa-mars")).toBe(true);
    });
    dogItem.unmount();
  });

  describe("renders female cat item correctly", () => {
    const catItem = render(<PetItem pet={femaleCat} id="cat" />);
    const speciesIcon = screen.getByTestId("list-species-icon");
    const sexIcon = screen.getByTestId("list-sex-icon");
    it("renders the cat item", () => {
      expect(catItem);
    });
    it("renders the cat species icon", () => {
      expect(speciesIcon.classList.contains("fa-cat")).toBe(true);
    });
    it("renders the female sex icon", () => {
      expect(sexIcon.classList.contains("fa-venus")).toBe(true);
    });
  });
});
