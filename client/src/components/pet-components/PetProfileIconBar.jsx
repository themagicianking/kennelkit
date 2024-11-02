import PropTypes from "prop-types";
import { Tooltip, IconButton } from "@material-tailwind/react";

export function PetProfileIconBar({ isChecked, staytype }) {
  return (
    <>
      {isChecked ? (
        <Tooltip content="This pet is checked in.">
          <IconButton
            variant="gradient"
            className="rounded-full pet-profile-header-item"
            data-testid="checked-in-tooltip"
          >
            <i className="fas fa-check" />
          </IconButton>
        </Tooltip>
      ) : (
        <></>
      )}
      {staytype == "daycare" && isChecked ? (
        <Tooltip content="This is a daycare pet.">
          <IconButton
            variant="gradient"
            className="rounded-full pet-profile-header-item"
            data-testid="staytype-tooltip"
          >
            <i className="fas fa-sun" />
          </IconButton>
        </Tooltip>
      ) : (
        <></>
      )}
      {staytype == "boarding" && isChecked ? (
        <Tooltip content="This is a boarding pet.">
          <IconButton
            variant="gradient"
            className="rounded-full pet-profile-header-item"
            data-testid="staytype-tooltip"
          >
            <i className="fas fa-moon" />
          </IconButton>
        </Tooltip>
      ) : (
        <></>
      )}
    </>
  );
}

PetProfileIconBar.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  staytype: PropTypes.string.isRequired,
};
