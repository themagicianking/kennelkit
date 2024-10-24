import { Tooltip, IconButton } from "@material-tailwind/react";

export function PetProfileIconBar({ isChecked, staytype }) {
  return (
    <>
      {isChecked && staytype == "daycare" ? (
        <>
          <Tooltip content="This pet is checked in.">
            <IconButton
              variant="gradient"
              className="rounded-full pet-profile-header-item"
            >
              <i className="fas fa-check" />
            </IconButton>
          </Tooltip>
          <Tooltip content="This is a daycare pet.">
            <IconButton
              variant="gradient"
              className="rounded-full pet-profile-header-item"
            >
              <i className="fas fa-sun" />
            </IconButton>
          </Tooltip>
        </>
      ) : isChecked && staytype == "boarding" ? (
        <>
          <Tooltip content="This pet is checked in.">
            <IconButton
              variant="gradient"
              className="rounded-full pet-profile-header-item"
            >
              <i className="fas fa-check" />
            </IconButton>
          </Tooltip>
          <Tooltip content="This is a boarding pet.">
            <IconButton
              variant="gradient"
              className="rounded-full pet-profile-header-item"
            >
              <i className="fas fa-moon" />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
