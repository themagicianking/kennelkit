import { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import ListView from "./ListView";

export function CheckedInPetsList() {
  const [checkedInPetsList, setCheckedInPetsList] = useState([]);

  async function loadCheckedInPets() {
    try {
      await fetch("http://localhost:5000/checkedinpets")
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
        <ListView list={checkedInPetsList} />
      </div>
    </div>
  );
}
