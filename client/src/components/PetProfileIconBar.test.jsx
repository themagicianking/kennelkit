import { render } from "@testing-library/react";
import { PetProfileIconBar } from "./PetProfileIconBar";

describe("Pet Profile Icon Bar", () => {
  const iconBar = render(<PetProfileIconBar isChecked={true} staytype={"daycare"} />);
  it("renders the icon bar", () => {
    expect(iconBar);
  });
});
