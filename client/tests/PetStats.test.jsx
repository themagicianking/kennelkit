import { render, screen } from "@testing-library/react";
import { PetStats } from "../src/components/pet-components/PetStats";

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

describe("Pet Stats", () => {
  describe("Renders male dog stats correctly", () => {
    const maleDogStats = render(<PetStats pet={maleDog} owner={owner} />);
    const speciesIcon = screen.getByTestId("profile-species-icon");
    const sexIcon = screen.getByTestId("profile-sex-icon");
    const alteredString = screen.getByTestId("altered-string").textContent;
    it("renders the stats", () => {
      expect(maleDogStats);
    });
    it("renders the dog species icon", () => {
      expect(speciesIcon.classList.contains("fa-dog")).toBe(true);
    });
    it("renders the male sex icon", () => {
      expect(sexIcon.classList.contains("fa-mars")).toBe(true);
    });
    it("generates the correct altered string", () => {
      expect(alteredString).toBe(" Neutered");
    });
    // screen.debug();
    maleDogStats.unmount();
  });

  describe("renders female cat stats correctly", () => {
    const femaleCatStats = render(<PetStats pet={femaleCat} owner={owner} />);
    const speciesIcon = screen.getByTestId("profile-species-icon");
    const sexIcon = screen.getByTestId("profile-sex-icon");
    const alteredString = screen.getByTestId("altered-string").textContent;
    it("renders the item", () => {
      expect(femaleCatStats);
    });

    it("renders the correct species icon", () => {
      expect(speciesIcon.classList.contains("fa-cat")).toBe(true);
    });

    it("renders the correct sex icon", () => {
      expect(sexIcon.classList.contains("fa-venus")).toBe(true);
    });
    it("generates the correct altered string", () => {
      expect(alteredString).toBe(" Spayed");
    });
    femaleCatStats.unmount();
  });

  describe("renders intact string", () => {
    render(<PetStats pet={maleCat} owner={owner} />);
    const alteredString = screen.getByTestId("altered-string").textContent;

    it("generates the intact string", () => {
      expect(alteredString).toBe(" Intact");
    });
  });
});
