// to do: make separate components for each kind of list view

import { List } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import PetItem from "./PetItem";

export default function ListView({list}) {
  // const [list, setList] = useState([]);

  // async function loadPets() {
  //   await fetch("http://localhost:5000/checkedinpets")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => setList(data));
  // }

  // useEffect(() => {
  //   loadPets();
  // }, []);

  return (
    <List>
      {list.map((listitem) => (
        <PetItem key={listitem.id} pet={listitem} />
      ))}
    </List>
  );
}
