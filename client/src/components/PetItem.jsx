// todo: add icon for photo
import {
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { CheckInToggle } from "./CheckInToggle";
import { PetProfile } from "./PetProfile";
import { OWNERNAMES } from "../utilities/dummydata";

export default function PetItem({ pet }) {
  return (
    <ListItem>
      <ListItemPrefix>
        <PetProfile pet={pet} owner={OWNERNAMES[0]} />
      </ListItemPrefix>
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
          <IconButton>
            <i className="fas fa-pen-to-square" />
          </IconButton>
        </div>
      </ListItemSuffix>
    </ListItem>
  );
}
