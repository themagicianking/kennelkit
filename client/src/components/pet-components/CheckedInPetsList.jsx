import { useState, useEffect } from "react";
import { useBaseLink } from "../../BaseLinkProvider";
import { Navbar } from "../Navbar";
import { PetListView } from "./PetListView";

export function CheckedInPetsList() {
  const [checkedInPetsList, setCheckedInPetsList] = useState([]);
  const link = useBaseLink();

  async function loadCheckedInPets() {
    try {
      await fetch(`https://${link}/checkedinpets`)
        .then((res) => {
          return res.json();
        })
        .then((data) => setCheckedInPetsList(data));
    } catch (e) {
      console.log(
        "Could not connect to server. The following error occured:",
        e
      );
    }
  }

  useEffect(() => {
    loadCheckedInPets();
  }, []);

  return (
    <div className="flex">
      <Navbar />
      <div>
        <h2>Checked in pets:</h2>
        <PetListView list={checkedInPetsList} />
      </div>
    </div>
  );
}
