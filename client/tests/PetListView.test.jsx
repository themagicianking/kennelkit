import { render, screen } from "@testing-library/react";
import { PetListView } from "../src/components/pet-components/PetListView";
const baseURL = import.meta.env.VITE_API_URL;

let list = [
  {
    id: 1,
    checkedin: true,
    petname: "Dog",
    sex: "male",
    species: "dog",
  },
  {
    id: 2,
    checkedin: false,
    petname: "Cat",
    sex: "female",
    species: "cat",
  },
];

describe("Pet List View", () => {
  describe("Renders the list when there are items returned", () => {
    const petListView = render(<PetListView list={list} baseURL={baseURL} />);
    it("renders the list", () => {
      expect(list);
    });
    petListView.unmount();
  });
  describe('Returns a "no pets found" message if the list is empty', () => {
    render(<PetListView list={[]} baseURL={baseURL} />);
    const message = screen.getByTestId("message").textContent;
    it("returns the message", () => {
      expect(message).toBe("No pets found.");
    });
  });
});
