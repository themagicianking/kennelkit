import { render, screen } from "@testing-library/react";
import { PetStats } from "./PetStats";

let maleDog = {
  id: 1,
  checkedin: true,
  petname: "name",
  sex: "male",
  altered: true,
  species: "dog",
};

let femaleCat = {
  id: 2,
  checkedin: false,
  petname: "name",
  sex: "female",
  altered: true,
  species: "cat",
};

let maleCat = {
  id: 3,
  checkedin: false,
  petname: "name",
  sex: "male",
  altered: false,
  species: "cat",
};

let owner = {
  firstname: "Firstname",
  lastname: "Lastname",
  phone: "123-456-7890",
  email: "email@email.com",
  ecfirstname: "Emergency",
  eclastname: "Contact",
  ecphone: "987-654-3210",
  ecemail: "ecemail@ecemail.com",
};

describe.skip("Pet Stats", () => {
  describe.skip("Renders male dog stats correctly", () => {
    const maleDogStats = render(<PetStats pet={maleDog} owner={owner} />);
    const dogSpeciesIcon = screen.getByTestId("profile-dog-species-icon");
    const maleSexIcon = screen.getByTestId("profile-male-sex-icon");
    const neuteredString = screen.getByText("Neutered");

    it("renders the stats", () => {
      expect(maleDogStats);
    });
    it("renders the dog species icon", () => {
      expect(dogSpeciesIcon.classList.contains("fa-dog")).toBe(true);
    });
    it("renders the male sex icon", () => {
      expect(maleSexIcon.classList.contains("fa-mars")).toBe(true);
    });
    it("generates the correct altered string", () => {
      expect(neuteredString);
    });
  });

  describe.skip("renders female cat stats correctly", () => {
    const femaleCatStats = render(<PetStats pet={femaleCat} owner={owner} />);
    const femaleSexIcon = screen.getByTestId("profile-female-sex-icon");
    const catSpeciesIcon = screen.getByTestId("profile-cat-species-icon");
    const spayedString = screen.getByText("Spayed");

    it("renders the item", () => {
      expect(femaleCatStats);
    });

    it("renders the correct species icon", () => {
      expect(catSpeciesIcon.classList.contains("fa-cat")).toBe(true);
    });

    it("renders the correct sex icon", () => {
      expect(femaleSexIcon.classList.contains("fa-venus")).toBe(true);
    });
    it("generates the correct altered string", () => {
      expect(spayedString);
    });
  });

  describe("renders intact string", () => {
    render(<PetStats pet={maleCat} owner={owner} />);
    const intactString = screen.getByText("Intact");

    it("generates the intact string", () => {
      expect(intactString);
    });

    screen.debug();
  });
});
