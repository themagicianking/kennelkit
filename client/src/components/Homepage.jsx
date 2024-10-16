import PetProfile from "./PetProfile";

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

export default function Homepage() {
  return (
    <>
      {/* <h1>Welcome to your kennel!</h1> */}
      <PetProfile
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
    </>
  );
}
