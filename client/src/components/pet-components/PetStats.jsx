import PropTypes from "prop-types";
import { getAltered, getAge } from "../../utilities/pets";

export function PetStats({ pet, owner }) {
  console.log("from the pet profile:", pet.altered, pet.sex)
  let alteredString = getAltered(pet.altered, pet.sex);
  let age = getAge(pet.birthday);

  return (
    <div className="pet-stats gap-2">
      <ul>
        <li>
          {pet.species == "dog" ? (
            <i className="fas fa-dog" data-testid="profile-species-icon" />
          ) : (
            <i className="fas fa-cat" data-testid="profile-species-icon" />
          )}{" "}
          {pet.breed}
        </li>
        <li role="sex-data">
          {pet.sex == "male" ? (
            <i className="fas fa-mars" data-testid="profile-sex-icon" />
          ) : (
            <i className="fas fa-venus" data-testid="profile-sex-icon" />
          )}{" "}
          <span data-testid="altered-string"> {alteredString}</span>
        </li>
        <li>
          {age} · {pet.weight}lbs
        </li>
      </ul>
      <h3>
        Owner: {owner.firstname} {owner.lastname}
      </h3>
      <ul>
        <li>
          ({owner.phone.slice(0, 3)}) - {owner.phone.slice(3, 6)} -
          {owner.phone.slice(6)} · {owner.email}
        </li>
      </ul>
      <h3>
        Emergency Contact: {"Firstname"} {"Lastname"}
      </h3>
      <ul>
        <li>
          {"(123) - 456 - 7890"} · {"email@email.com"}
        </li>
      </ul>
    </div>
  );
}

PetStats.propTypes = {
  pet: PropTypes.object.isRequired,
  owner: PropTypes.object.isRequired,
};
