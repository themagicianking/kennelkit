import { Typography } from "@material-tailwind/react";
import { getAltered, getAge } from "../utilities/pets";

export function PetStats({ pet, owner }) {
  let alteredString = getAltered(pet.altered, pet.sex);
  let age = getAge(pet.birthday);

  return (
    <ul>
      <li>
        {pet.species == "dog" ? (
          <i className="fas fa-dog" />
        ) : (
          <i className="fas fa-cat" />
        )}{" "}
        {pet.breed}
      </li>
      <li>
        {pet.sex == "male" ? (
          <i className="fas fa-mars" id="profile-sex-icon" />
        ) : (
          <i className="fas fa-venus" id="profile-sex-icon" />
        )}{" "}
        {alteredString}
      </li>
      <li>
        {age} · {pet.weight}lbs
      </li>
      <li>
        <Typography variant="h5">
          Owner: {owner.firstname} {owner.lastname}
        </Typography>
        <ul>
          <li>
            {owner.phone} · {owner.email}
          </li>
        </ul>
      </li>
      <li>
        <Typography variant="h5">
          Emergency Contact: {owner.ecfirstname} {owner.eclastname}
        </Typography>
        <ul>
          <li>
            {owner.ecphone} · {owner.ecemail}
          </li>
        </ul>
      </li>
    </ul>
  );
}
