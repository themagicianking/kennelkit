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
          <i className="fas fa-dog" data-testid="list-dog-species-icon" />
        ) : (
          <i className="fas fa-cat" data-testid="list-cat-species-icon" />
        )}
      </ListItemPrefix>
      <ListItemPrefix>
        {pet.sex == "male" ? (
          <i className="fas fa-mars" data-testid="list-male-sex-icon" />
        ) : (
          <i className="fas fa-venus" data-testid="list-female-sex-icon" />
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
