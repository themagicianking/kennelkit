import { List } from "@material-tailwind/react";
import { OwnerItem } from "./OwnerItem";

export function OwnerListView({ list }) {
  return list.length > 0 ? (
    <List>
      {list.map((listitem) => (
        <OwnerItem key={listitem.id} owner={listitem} />
      ))}
    </List>
  ) : (
    <p data-testid="message">No owners found.</p>
  );
}
