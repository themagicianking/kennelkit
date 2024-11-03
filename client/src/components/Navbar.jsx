import PropTypes from "prop-types";
import { CreateOwnerForm } from "./owner-components/CreateOwnerForm";
import { CreatePetForm } from "./pet-components/CreatePetForm";
import { List, ListItem, ListItemPrefix } from "@material-tailwind/react";

export function Navbar({ selected }) {
  return (
    <div className="navbar-container">
      <List className="navbar">
        <ListItem className="main-tabs" ripple={false}>
          <a href="/">
            <ListItem
              className={"navtab " + (selected == 0 ? "selected-tab" : "")}
              ripple={false}
            >
              <ListItemPrefix>
                <i className="fas fa-house" />
              </ListItemPrefix>
              Home
            </ListItem>
          </a>
          <a href="/pets/checkedin">
            <ListItem
              className={"navtab " + (selected == 1 ? "selected-tab" : "")}
              ripple={false}
            >
              <ListItemPrefix>
                <i className="fas fa-sun" />
              </ListItemPrefix>
              Checked In
            </ListItem>
          </a>
          <a href="/pets">
            <ListItem
              className={"navtab " + (selected == 2 ? "selected-tab" : "")}
              ripple={false}
            >
              <ListItemPrefix>
                <i className="fas fa-paw" />
              </ListItemPrefix>
              All Pets
            </ListItem>
          </a>
          <a href="/owners">
            <ListItem className="navtab" ripple={false}>
              <ListItemPrefix>
                <i className="fas fa-user" />
              </ListItemPrefix>
              All Owners
            </ListItem>
          </a>
        </ListItem>
        <ListItem className="form-tabs" ripple={false}>
          <CreatePetForm />
          <CreateOwnerForm />
        </ListItem>
      </List>
      <div className="folder-corner"></div>
    </div>
  );
}

Navbar.propTypes = {
  selected: PropTypes.number.isRequired,
};
