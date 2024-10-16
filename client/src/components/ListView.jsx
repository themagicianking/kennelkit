import { List } from "@material-tailwind/react";
import PetItem from "./PetItem";

export default function ListView({ list }) {
  return (
    <List>
      {list.map((listitem) => (
        <PetItem pet={listitem} />
      ))}
    </List>
  );
}
