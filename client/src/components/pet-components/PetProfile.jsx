/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useServerName } from "../../ServerNameProvider";
import { PetProfileIconBar } from "./PetProfileIconBar";
import { PetStats } from "./PetStats";
import { PetProfileTabs } from "./PetProfileTabs";
import { EditPetForm } from "./EditPetForm";
import { DefaultSkeleton } from "../LoadingScreen";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  CardFooter,
  Switch,
} from "@material-tailwind/react";

export function PetProfile() {
  const id = useParams().id;
  const serverName = useServerName();
  const [loading, setLoading] = useState(true);
  const [pet, setPet] = useState(null);
  const [owner, setOwner] = useState(null);
  const [isChecked, setIsChecked] = useState(null);

  useEffect(() => {
    loadPet(id);
  }, []);

  async function loadPet(id) {
    try {
      await fetch(`https://${serverName}/petbyid?id=${id}`)
        .then((res) => {
          if (res.status >= 400) {
            throw res.status;
          }
          return res.json();
        })
        .then((json) => {
          setPet(json);
          loadOwner(json.ownerid);
          setLoading(false);
          setIsChecked(json.checkedin);
        });
    } catch (e) {
      setPet(null);
      setLoading(false);
      console.log("Could not get pet. The following error occurred:", e);
    }
  }

  async function loadOwner(id) {
    try {
      await fetch(`https://${serverName}/ownerbyid?id=${id}`)
        .then((res) => {
          if (res.status >= 400) {
            throw res.status;
          }
          return res.json();
        })
        .then((json) => {
          setOwner(json);
          setLoading(false);
        });
    } catch (e) {
      setOwner(null);
      setLoading(false);
      console.log(`Could not get owner. The following error occurred: ${e}`);
    }
  }

  async function toggleCheckIn(isChecked) {
    console.log(`Sending check in status ${isChecked} to the server.`);
    try {
      await fetch(`https://${serverName}/checkin`, {
        method: "PUT",
        body: JSON.stringify({
          id: pet.id,
          checkedin: isChecked,
          staytype: "daycare",
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (res.status >= 400) {
            throw res.status;
          }
          return res.json();
        })
        .then((json) =>
          console.log("Pet's check in status has been changed to:", json)
        );
    } catch (e) {
      console.log(
        "Could not update check in status. The following error occurred:",
        e
      );
    }
  }

  function handleChange(e) {
    toggleCheckIn(e.target.checked);
    setIsChecked(e.target.checked);
  }

  if (loading) {
    return <DefaultSkeleton />;
  }

  return pet && owner ? (
    <div className="profile-container">
      <Card shadow={true} variant="gradient" color="white">
        <CardHeader
          floated={false}
          color="gray"
          className="rounded-b-none profile-header"
        >
          <h2>
            {pet.petname} {owner.lastname}{" "}
            <PetProfileIconBar
              isChecked={isChecked}
              staytype={pet.staytype}
              className="pet-profile-icons"
            />
          </h2>
        </CardHeader>
        <CardBody className="profile-body">
          <div className="pet-info">
            <figure>
              <img
                className="h-96 w-96 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50 pet-profile-image"
                src="https://lh3.googleusercontent.com/pw/AP1GczPul97HrD-i2k9STdgNDmvTyVJI1bFyxJRoTZiLVSu4Q9pCQiYitPJs3_sIdGLEnS8RCwVewLlNBZY_r935JYiG1v4bb_-5-Z-Yc2LDC4JawfKHJlrO1tHPGdrSkrsBpsxrEYPQiD2Vg2EeR8ismGzQ=w1270-h1686-s-no-gm?authuser=0"
              ></img>
            </figure>
            <Typography
              as="figcaption"
              variant="small"
              className="mt-2 text-center font-normal"
            >
              {pet.physicaldesc}
            </Typography>
            <PetStats pet={pet} owner={owner} />
          </div>
          <PetProfileTabs />
        </CardBody>
        <CardFooter className="profile-footer">
          <Switch
            color="green"
            label="Checked In?"
            checked={isChecked}
            onChange={handleChange}
          />
          <EditPetForm pet={pet} owner={owner} />
        </CardFooter>
      </Card>
    </div>
  ) : !pet && !owner ? (
    <p>Pet could not be found.</p>
  ) : (
    <p>Loading...</p>
  );
}
