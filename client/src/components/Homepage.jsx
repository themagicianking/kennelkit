import PetProfile from "./PetProfile";

const PET = {
  petname: "Watts",
  species: "dog",
  breed: "Airedale Terrier",
  sex: "male",
  altered: true,
  birthday: "2017-05-14",
  weight: 55,
  physicaldesc: "Black and tan, curly",
};

export default function Homepage() {
  return (
    <>
      <h1>Welcome to your kennel!</h1>
      <PetProfile
        petname={PET.petname}
        species={PET.species}
        breed={PET.breed}
        sex={PET.sex}
        altered={PET.altered}
        birthday={PET.birthday}
        weight={PET.weight}
        physicaldesc={PET.physicaldesc}
      />
    </>
  );
}
