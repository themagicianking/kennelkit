import { List, ListItem } from "@material-tailwind/react";

export default function ListView({ list }) {
  return (
    <List>
      {list.map((listitem) => (
        <ListItem>{JSON.stringify(listitem)}</ListItem>
      ))}
    </List>
  );
}
