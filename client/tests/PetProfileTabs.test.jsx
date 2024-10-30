import { render } from "@testing-library/react";
import { PetProfileTabs } from "../src/components/pet-components/PetProfileTabs";

describe("Pet Profile Tabs", () => {
  const tabs = render(<PetProfileTabs />);
  it("renders the tabs", () => {
    expect(tabs);
  });
});
