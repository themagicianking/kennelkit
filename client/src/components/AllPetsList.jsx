import { useState, useEffect } from "react";
import ListView from "./ListView";

export default function AllPetsList() {
  const [allPetsList, setAllPetsList] = useState([]);

  async function loadAllPets() {
    await fetch("http://localhost:5000/allpets")
      .then((res) => {
        return res.json();
      })
      .then((data) => setAllPetsList(data));
  }

  useEffect(() => {
    loadAllPets();
  }, []);

return (<ListView list={allPetsList}/>)
}