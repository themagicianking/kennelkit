import { useState, useEffect } from "react";
import { useBaseLink } from "../../BaseLinkProvider";
import { Navbar } from "../Navbar";
import { PetListView } from "./PetListView";

export function AllPetsList() {
  const [allPetsList, setAllPetsList] = useState(null);
  const link = useBaseLink();

  async function loadAllPets() {
    try {
      await fetch(`https://${link}/allpets`)
        .then((res) => {
          if (res.status >= 400) {
            throw res.status;
          }
          return res.json();
        })
        .then((data) => setAllPetsList(data));
    } catch (e) {
      console.log("Could not get pet list. The following error occurred:", e);
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
        {allPetsList ? (
          <PetListView list={allPetsList} />
        ) : (
          <p>List could not be found.</p>
        )}
      </div>
    </div>
  );
}
