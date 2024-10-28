import { render } from "@testing-library/react";
import { PetStats } from "./PetStats";

describe.skip("Pet Stats", () => {
  const stats = render(<PetStats pet={} owner={}/>);
  it("renders the stats", () => {
    expect(stats);
  });
});
