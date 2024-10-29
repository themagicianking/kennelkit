import {
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Typography,
  IconButton,
} from "@material-tailwind/react";

export function OwnerItem({ owner }) {
  let link = `/owners/${owner.id}`;
  return (
    <ListItem>
      <ListItemPrefix>
        <i className="fas fa-user" />
      </ListItemPrefix>
      <a href={link} data-testid="link">
        <Typography variant="h6">
          {`${owner.firstname} ${owner.lastname}`}
        </Typography>
      </a>
      <ListItemSuffix>
        <div className="flex gap-4">
          <IconButton>
            <i className="fas fa-pen-to-square" />
          </IconButton>
        </div>
      </ListItemSuffix>
    </ListItem>
  );
}