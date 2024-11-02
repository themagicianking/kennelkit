import PropTypes from "prop-types";
import { PetItem } from "./PetItem";
import { List } from "@material-tailwind/react";

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

PetListView.propTypes = {
  list: PropTypes.array.isRequired,
};
