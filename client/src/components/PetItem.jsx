import { ListItem, ListItemPrefix, Typography } from "@material-tailwind/react";

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
      <Typography variant="h6"> {pet.petname}</Typography>
    </ListItem>
  );
}
