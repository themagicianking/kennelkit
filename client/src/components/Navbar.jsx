import { List, ListItem, ListItemPrefix } from "@material-tailwind/react";

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
      <a href="pets/new">
      <ListItem>
        <ListItemPrefix>
          <i className="fas fa-plus" />
        </ListItemPrefix>
        Create a Pet
      </ListItem>
      </a>
    </List>
  );
}
