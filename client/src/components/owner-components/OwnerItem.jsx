import PropTypes from "prop-types";
import { EditOwnerForm } from "../owner-components/EditOwnerForm";
import {
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
} from "@material-tailwind/react";

export function OwnerItem({ owner }) {
  let linkToProfile = `/owners/${owner.id}`;
  return (
    <ListItem className="owner-item">
      <ListItemPrefix>
        <i className="fas fa-user" />
      </ListItemPrefix>
      <a href={linkToProfile} data-testid="link">
        <h3>{`${owner.firstname} ${owner.lastname}`}</h3>
      </a>
      <ListItemSuffix>
        <EditOwnerForm owner={owner} />
      </ListItemSuffix>
    </ListItem>
  );
}

OwnerItem.propTypes = {
  owner: PropTypes.object.isRequired,
};
