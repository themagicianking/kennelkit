import PropTypes from "prop-types";
import { EditOwnerForm } from "../owner-components/EditOwnerForm";
import {
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Typography,
} from "@material-tailwind/react";

export function OwnerItem({ owner }) {
  let linkToProfile = `/owners/${owner.id}`;
  return (
    <ListItem className="owner-item">
      <ListItemPrefix>
        <i className="fas fa-user" />
      </ListItemPrefix>
      <a href={linkToProfile} data-testid="link">
        <Typography variant="h6">
          {`${owner.firstname} ${owner.lastname}`}
        </Typography>
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
