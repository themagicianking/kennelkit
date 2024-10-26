// todo: search material tailwind documentation to find a way to set a default tab
// todo: change styling for tooltip info
// todo: change color scheme
// todo: add title font
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  CardFooter,
  Switch,
  Button,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { PetProfileIconBar } from "./PetProfileIconBar";
import { PetStats } from "./PetStats";
import { PetProfileTabs } from "./PetProfileTabs";
import { useParams } from "react-router-dom";
import { OWNER } from "../utilities/dummydata";

export function PetProfile({ baseURL }) {
  let id = useParams().id;
  let editLink = `/pets/${id}/edit`;
  let owner = OWNER;
  const [loading, setLoading] = useState(true);
  const [pet, setPet] = useState(null);
  const [isChecked, setIsChecked] = useState(null);

  async function loadPet(id) {
    try {
      await fetch(`https://${baseURL}/pet?id=${id}`)
        .then((res) => {
          if (res.status >= 400) {
            throw res.status;
          }
          return res.json();
        })
        .then((json) => {
          setPet(json);
          setLoading(false);
          setIsChecked(json.checkedin);
        });
    } catch (e) {
      setPet(null);
      setLoading(false);
      console.log("Could not fetch pet.");
    }
  }

  async function toggleCheckIn(isChecked) {
    console.log(`Sent check in status ${isChecked} to the server.`);
    try {
      await fetch(`https://${baseURL}/checkin`, {
        method: "PUT",
        body: JSON.stringify({ id: pet.id, checkedin: isChecked }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          return res.json();
        })
        .then((json) =>
          console.log("Pet's check in status has been changed to:", json)
        );
    } catch {
      console.log("Server could not be updated.");
    }
  }

  function handleChange(e) {
    toggleCheckIn(e.target.checked);
    setIsChecked(e.target.checked);
  }

  useEffect(() => {
    loadPet(id);
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      {pet ? (
        <Card shadow={true} variant="gradient" color="white">
          <CardHeader
            floated={false}
            color="gray"
            className="rounded-b-none pet-profile-header"
          >
            <Typography variant="h2" className="pet-profile-header-item">
              {pet.petname} {owner.lastname}
            </Typography>
            <PetProfileIconBar isChecked={isChecked} staytype={pet.staytype} />
          </CardHeader>
          <CardBody className="pet-profile-body">
            <div>
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
          <CardFooter className="gap-4 pet-profile-footer">
            <a href={editLink}>
              <Button>Edit</Button>
            </a>
            <Switch
              color="green"
              label="Checked In?"
              checked={isChecked}
              onChange={handleChange}
            />
          </CardFooter>
        </Card>
      ) : (
        <p>Pet could not be found.</p>
      )}
    </>
  );
}
