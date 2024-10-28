// todo: add icon for photo
import {
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { CheckInToggle } from "./CheckInToggle";

export function PetItem({ pet, baseURL }) {
  let link = `/pets/${pet.id}`;

  return (
    <ListItem>
      <ListItemPrefix>
        {pet.species == "dog" ? (
          <i className="fas fa-dog" id="species-icon" />
        ) : (
          <i className="fas fa-cat" id="species-icon" />
        )}
      </ListItemPrefix>
      <ListItemPrefix>
        {pet.sex == "male" ? (
          <i className="fas fa-mars" id="sex-icon" />
        ) : (
          <i className="fas fa-venus" id="sex-icon" />
        )}
      </ListItemPrefix>
      <a href={link}>
        <Typography variant="h6"> {pet.petname}</Typography>
      </a>
      <ListItemSuffix>
        <div className="flex gap-4">
          <CheckInToggle
            id={pet.id}
            checkedin={pet.checkedin}
            baseURL={baseURL}
          />
          <IconButton>
            <i className="fas fa-pen-to-square" />
          </IconButton>
        </div>
      </ListItemSuffix>
    </ListItem>
  );
}
