// todo: add icon for photo
import {
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { CheckInToggle } from "./CheckInToggle";

export default function PetItem({ pet }) {
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
      <Typography variant="h6"> {pet.petname}</Typography>
      <ListItemSuffix>
        <div className="flex gap-4">
          <CheckInToggle id={pet.id} checkedin={pet.checkedin} />
          <IconButton>
            <i className="fas fa-pen-to-square" />
          </IconButton>
        </div>
      </ListItemSuffix>
    </ListItem>
  );
}
