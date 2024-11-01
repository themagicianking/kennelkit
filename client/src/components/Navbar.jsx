import { List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { CreateOwnerForm } from "./owner-components/CreateOwnerForm";
import { CreatePetForm } from "./pet-components/CreatePetForm";

export function Navbar() {
  return (
    <List>
      <a href="/">
        <ListItem>
          <ListItemPrefix>
            <i className="fas fa-house" />
          </ListItemPrefix>
          Home
        </ListItem>
      </a>
      <a href="/pets/checkedin">
        <ListItem>
          <ListItemPrefix>
            <i className="fas fa-sun" />
          </ListItemPrefix>
          Checked In
        </ListItem>
      </a>
      <a href="/pets">
        <ListItem>
          <ListItemPrefix>
            <i className="fas fa-paw" />
          </ListItemPrefix>
          All Pets
        </ListItem>
      </a>
      <a href="/owners">
        <ListItem>
          <ListItemPrefix>
            <i className="fas fa-user" />
          </ListItemPrefix>
          All Owners
        </ListItem>
      </a>
      <CreatePetForm />
      <CreateOwnerForm />
    </List>
  );
}
