import PetProfile from "./PetProfile";
import AllPetsList from "./AllPetsList";
import CheckedInPetsList from "./CheckedInPetsList";
import { OWNER, PET, LIST } from "../utilities/dummydata";
import { useState, useEffect } from "react";

export default function Homepage() {
  const [pet, setPet] = useState(null);

  async function getPet() {
    await fetch("http://localhost:5000/pet?id=1")
      .then((res) => {
        return res.json();
      })
      .then((data) => setPet(data));
  }

  useEffect(() => {
    getPet();
  }, []);

  return (
    <>
      <h1>Welcome to your kennel!</h1>
      {/* <p>All pets:</p>
      <AllPetsList />
      <p>Checked in pets:</p>
      <CheckedInPetsList /> */}
      {pet ? (
        <PetProfile pet={pet} owner={OWNER} />
      ) : (<></>
        // <PetProfile pet={PET} owner={OWNER} />
      )}
    </>
  );
}
