import { useState, useEffect } from "react";
import { Navbar } from "../Navbar";
import { PetListView } from "./PetListView";

export function CheckedInPetsList({ baseURL }) {
  const [checkedInPetsList, setCheckedInPetsList] = useState([]);

  async function loadCheckedInPets() {
    try {
      await fetch(`https://${baseURL}/checkedinpets`)
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
        <PetListView list={checkedInPetsList} baseURL={baseURL} />
      </div>
    </div>
  );
}
