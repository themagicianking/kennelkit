// to do: make separate components for each kind of list view

import { List } from "@material-tailwind/react";
import { PetItem } from "./PetItem";

export function PetListView({ list, baseURL }) {
  return (
    <List>
      {list.map((listitem) => (
        <PetItem key={listitem.id} pet={listitem} baseURL={baseURL}/>
      ))}
    </List>
  );
}
