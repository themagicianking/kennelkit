import { fireEvent, render, screen } from "@testing-library/react";
import { PetProfileIconBar } from "./PetProfileIconBar";

describe.skip("Pet Profile Icon Bar", () => {
  describe("renders daycare pet", () => {
    const daycareIconBar = render(
      <PetProfileIconBar isChecked={true} staytype={"daycare"} />
    );
    const checkedInTooltip = screen.getByTestId("checked-in-tooltip");
    const staytypeTooltip = screen.getByTestId("staytype-tooltip");
    const daycareIcon = staytypeTooltip.getElementsByTagName("i").item(0);
    fireEvent.mouseEnter(checkedInTooltip);
    fireEvent.mouseEnter(staytypeTooltip);
    const checkedInTooltipText = screen.getByText("This pet is checked in.");
    const daycareTooltipText = screen.getByText("This is a daycare pet.");

    it("renders the icon bar", () => {
      expect(daycareIconBar);
    });
    it("renders the checked in tooltip", () => {
      expect(checkedInTooltip);
    });
    it("renders the checked in tooltip text", () => {
      expect(checkedInTooltipText);
    });
    it("renders the daycare icon", () => {
      expect(daycareIcon.classList.contains("fa-sun"));
    });
    it("renders the daycare tooltip", () => {
      expect(daycareTooltipText);
    });
    daycareIconBar.unmount();
  });

  describe("renders boarding pet", () => {
    const boardingPet = render(
      <PetProfileIconBar isChecked={true} staytype={"boarding"} />
    );
    const checkedInTooltip = screen.getByTestId("checked-in-tooltip");
    const staytypeTooltip = screen.getByTestId("staytype-tooltip");
    const boardingIcon = staytypeTooltip.getElementsByTagName("i").item(0);
    fireEvent.mouseEnter(checkedInTooltip);
    fireEvent.mouseEnter(staytypeTooltip);
    const boardingTooltipText = screen.getByText("This is a boarding pet.");

    it("renders the boarding icon", () => {
      expect(boardingIcon.classList.contains("fa-moon"));
    });
    it("renders the boarding tooltip", () => {
      expect(boardingTooltipText);
    });
    boardingPet.unmount();
  });

  describe("does not render icons for checked out pet", () => {
    render(<PetProfileIconBar isChecked={false} staytype={null} />);
    const buttonIcons = document.getElementsByTagName("button");
    it("does not render any icons", () => {
      expect(buttonIcons.length).toBe(0);
    });
  });
});
