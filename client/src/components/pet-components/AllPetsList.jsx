import { useState, useEffect } from "react";
import { useBaseLink } from "../../BaseLinkProvider";
import { Navbar } from "../Navbar";
import { PetListView } from "./PetListView";

export function AllPetsList() {
  const [allPetsList, setAllPetsList] = useState([]);
  const link = useBaseLink();

  async function loadAllPets() {
    try {
      await fetch(`https://${link}/allpets`)
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
