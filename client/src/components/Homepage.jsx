import PetProfile from "./PetProfile";
import ListView from "./ListView";
import { useState, useEffect } from "react";

const OWNER = {
  firstname: "Cara",
  lastname: "Coleman",
  phone: "(555) 555 - 5555",
  email: "email@email.com",
  ecfirstname: "Thane",
  eclastname: "Wilson",
  ecphone: "(444) 444 - 4444",
  ecemail: "ecemail@email.com",
};

const PET = {
  id: 2,
  petname: "Watts",
  species: "dog",
  breed: "Airedale Terrier",
  sex: "male",
  altered: true,
  birthday: "2017-05-14",
  weight: 55,
  physicaldesc: "Black and tan, curly",
  staytype: "boarding",
  checkedin: true,
};

const PETITEM = {
  species: "cat",
  sex: "female",
  altered: true,
  petname: "Arcadia",
};

const LIST = [PET, PETITEM];

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
      <ListView list={LIST} />
      {/* {pet ? (
        <PetProfile
          id={pet.id}
          petname={pet.petname}
          species={pet.species}
          breed={pet.breed}
          sex={pet.sex}
          altered={pet.altered}
          birthday={pet.birthday}
          weight={pet.weight}
          physicaldesc={pet.physicaldesc}
          staytype={pet.staytype}
          checkedin={pet.checkedin}
          owner={OWNER}
        />
      ) : (
        <PetProfile
          id={PET.id}
          petname={PET.petname}
          species={PET.species}
          breed={PET.breed}
          sex={PET.sex}
          altered={PET.altered}
          birthday={PET.birthday}
          weight={PET.weight}
          physicaldesc={PET.physicaldesc}
          staytype={PET.staytype}
          checkedin={PET.checkedin}
          owner={OWNER}
        />
      )} */}
    </>
  );
}
