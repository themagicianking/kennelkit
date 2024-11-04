import PropTypes from "prop-types";
import { CheckInToggle } from "./CheckInToggle";
import {
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
} from "@material-tailwind/react";

export function PetItem({ pet }) {
  const profileLink = `/pets/${pet.id}`;

  return (
    <ListItem className="pet-item" ripple={false}>
      <ListItemPrefix>
        {pet.species == "dog" ? (
          <i className="fas fa-dog" data-testid="list-species-icon" />
        ) : (
          <i className="fas fa-cat" data-testid="list-species-icon" />
        )}
      </ListItemPrefix>
      <ListItemPrefix>
        {pet.sex == "male" ? (
          <i className="fas fa-mars" data-testid="list-sex-icon" />
        ) : (
          <i className="fas fa-venus" data-testid="list-sex-icon" />
        )}
      </ListItemPrefix>
      <a href={profileLink} data-testid="link">
        <h2> {pet.petname}</h2>
      </a>
      <ListItemSuffix className="flex gap-4">
        <CheckInToggle id={pet.id} checkedin={pet.checkedin} />
      </ListItemSuffix>
    </ListItem>
  );
}

PetItem.propTypes = {
  pet: PropTypes.object.isRequired,
};
