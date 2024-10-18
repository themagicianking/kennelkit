// todo: search material tailwind documentation to find a way to set a default tab
// todo: change styling for tooltip info
// todo: change color scheme
// todo: add title font
import {
  Dialog,
  DialogBody,
  Card,
  CardHeader,
  Typography,
  CardBody,
  CardFooter,
  IconButton,
  Switch,
} from "@material-tailwind/react";
import { useState } from "react";
import { PetProfileIconBar } from "./PetProfileIconBar";
import { PetStats } from "./PetStats";
import { PetProfileTabs } from "./PetProfileTabs";
import { EditPetModal } from "./EditPetModal";

export function PetProfile({ pet, owner }) {
  const [open, setOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(pet.checkedin);

  console.log("state of isChecked upon render", isChecked);

  const handleOpen = () => setOpen(!open);

  async function toggleCheckIn(isChecked) {
    try {
      await fetch("http://localhost:5000/checkin", {
        method: "PUT",
        body: JSON.stringify({ id: pet.id, checkedin: isChecked }),
        headers: { "Content-Type": "application/json" },
      });
    } catch {
      console.log("Server could not be updated.");
    }
  }

  function handleChange(e) {
    toggleCheckIn(e.target.checked);
    setIsChecked(e.target.checked);
  }

  return (
    <>
      <IconButton
        onClick={handleOpen}
        variant="outlined"
        className="rounded-full"
      >
        <i className="fas fa-eye" />
      </IconButton>
      <Dialog open={open} size={"xl"} handler={handleOpen}>
        <DialogBody className="h-[42rem] overflow-scroll">
          <Card shadow={true} variant="gradient" color="white">
            <CardHeader
              floated={false}
              color="gray"
              className="rounded-b-none pet-profile-header"
            >
              <Typography variant="h2" className="pet-profile-header-item">
                {pet.petname} {owner.lastname}
              </Typography>
              <PetProfileIconBar
                isChecked={isChecked}
                staytype={pet.staytype}
              />
            </CardHeader>
            <CardBody className="pet-profile-body">
              <div>
                <figure>
                  <img
                    className="h-96 w-96 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50 pet-profile-image"
                    src="https://lh3.googleusercontent.com/pw/AP1GczPul97HrD-i2k9STdgNDmvTyVJI1bFyxJRoTZiLVSu4Q9pCQiYitPJs3_sIdGLEnS8RCwVewLlNBZY_r935JYiG1v4bb_-5-Z-Yc2LDC4JawfKHJlrO1tHPGdrSkrsBpsxrEYPQiD2Vg2EeR8ismGzQ=w1270-h1686-s-no-gm?authuser=0"
                  ></img>
                  <Typography
                    as="caption"
                    variant="small"
                    className="mt-2 text-center font-normal"
                  >
                    {pet.physicaldesc}
                  </Typography>
                </figure>
                <PetStats pet={pet} owner={owner} />
              </div>
              <PetProfileTabs />
            </CardBody>
            <CardFooter className="gap-4 pet-profile-footer">
              <EditPetModal pet={pet} owner={owner} />
              <Switch
                color="green"
                label="Checked In?"
                checked={isChecked}
                onChange={handleChange}
              />
            </CardFooter>
          </Card>
        </DialogBody>
      </Dialog>
    </>
  );
}
