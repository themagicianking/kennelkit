/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { OwnerProfileTabs } from "./OwnerProfileTabs";
import { useServerName } from "../../ServerNameProvider";
import { EditOwnerForm } from "./EditOwnerForm";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

export function OwnerProfile() {
  let id = useParams().id;
  const serverName = useServerName();
  const [owner, setOwner] = useState(null);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadOwner(id);
    loadPets(id);
  }, []);

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
      setErrorMessage(
        `Could not get owner. The following error occurred: ${e}`
      );
    }
  }

  async function loadPets(id) {
    await fetch(`https://${serverName}/petsbyowner?id=${id}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setPets(json);
      });
  }

  if (loading) {
    return <div>loading...</div>;
  }

  return owner ? (
    <Card shadow={true} variant="gradient" color="white">
      <CardHeader floated={false} color="gray" className="rounded-b-none">
        <Typography variant="h2">
          {owner.firstname} {owner.lastname}
        </Typography>
      </CardHeader>
      <CardBody>
        <Typography variant="h4">Contact Information</Typography>
        <ul>
          <li>Phone: {owner.phone}</li>
          <li>Email: {owner.email}</li>
        </ul>
        {/* Emergency contact currently uses dummy data, as there is no emergency contact table. */}
        <Typography variant="h4">Emergency Contact</Typography>
        <ul>
          <li>Phone: Emergency contact phone</li>
          <li>Email: Emergency contact email</li>
        </ul>
        <OwnerProfileTabs pets={pets} />
      </CardBody>
      <CardFooter className="gap-4 pet-profile-footer">
        <EditOwnerForm owner={owner} />
      </CardFooter>
    </Card>
  ) : (
    <p>{errorMessage}</p>
  );
}
