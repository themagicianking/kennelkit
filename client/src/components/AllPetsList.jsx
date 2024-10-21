import { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { PetListView } from "./PetListView";

export function AllPetsList() {
  const [allPetsList, setAllPetsList] = useState([]);

  async function loadAllPets() {
    try {
      await fetch("http://localhost:5000/allpets")
        .then((res) => {
          return res.json();
        })
        .then((data) => setAllPetsList(data));
    } catch (e) {
      console.log(
        "Could not connect to the server. The following error occurred:",
        e
      );
    }
  }

  useEffect(() => {
    loadAllPets();
  }, []);

  return (
    <div className="flex">
      <Navbar />
      <div className="flex flex-col">
        <h2>All pets:</h2>
        <PetListView list={allPetsList} />
      </div>
    </div>
  );
}
