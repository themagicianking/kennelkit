import { render } from "@testing-library/react";
import { PetProfileTabs } from "./PetProfileTabs";

describe("Pet Profile Tabs", () => {
  const tabs = render(<PetProfileTabs />);
  it("renders the tabs", () => {
    expect(tabs);
  });
});
