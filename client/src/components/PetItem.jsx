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
          <i className="fas fa-dog" />
        ) : (
          <i className="fas fa-cat" />
        )}
      </ListItemPrefix>
      <ListItemPrefix>
        {pet.sex == "male" ? (
          <i className="fas fa-mars" />
        ) : (
          <i className="fas fa-venus" />
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
