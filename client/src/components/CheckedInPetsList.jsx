import { useState, useEffect } from "react";
import ListView from "./ListView";

export default function CheckedInPetsList() {
  const [checkedInPetsList, setCheckedInPetsList] = useState([]);

  async function loadCheckedInPets() {
    await fetch("http://localhost:5000/checkedinpets")
      .then((res) => {
        return res.json();
      })
      .then((data) => setCheckedInPetsList(data));
  }

  useEffect(() => {
    loadCheckedInPets();
  }, []);

  return <ListView list={checkedInPetsList} />;
}
