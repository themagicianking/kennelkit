// to do: make separate components for each kind of list view

import { List } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import PetItem from "./PetItem";

export default function ListView({list}) {


  return (
    <List>
      {list.map((listitem) => (
        <PetItem key={listitem.id} pet={listitem} />
      ))}
    </List>
  );
}
