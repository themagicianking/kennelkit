import { List } from "@material-tailwind/react";
import { PetItem } from "./PetItem";

export function PetListView({ list, baseURL }) {
  return list.length > 0 ? (
    <List>
      {list.map((listitem) => (
        <PetItem key={listitem.id} pet={listitem} baseURL={baseURL} />
      ))}
    </List>
  ) : (
    <p data-testid="message">No pets found.</p>
  );
}
