import { List } from "@material-tailwind/react";
import { PetItem } from "./PetItem";

export function PetListView({ list }) {
  return list.length > 0 ? (
    <List>
      {list.map((listitem) => (
        <PetItem key={listitem.id} pet={listitem} />
      ))}
    </List>
  ) : (
    <p data-testid="message">No pets found.</p>
  );
}
