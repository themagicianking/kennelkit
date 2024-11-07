import PropTypes from "prop-types";
import { OwnerItem } from "../owner-components/OwnerItem";
import { List } from "@material-tailwind/react";

export function OwnerListView({ list }) {
  return list.length > 0 ? (
    <List className="owner-list">
      {list.map((listItem) => (
        <OwnerItem key={listItem.id} owner={listItem} />
      ))}
    </List>
  ) : (
    <p data-testid="message">No owners found.</p>
  );
}

OwnerListView.propTypes = {
  list: PropTypes.array.isRequired,
};
