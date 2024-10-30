import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Typography,
} from "@material-tailwind/react";
import { OwnerProfileTabs } from "./OwnerProfileTabs";
import { OWNER } from "../utilities/dummydata";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function OwnerProfile({ baseURL }) {
  let id = useParams().id;
  const [owner, setOwner] = useState(null);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadOwner(id) {
    try {
      await fetch(`https://${baseURL}/owner?id=${id}`)
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
      console.log("Could not fetch owner.");
    }
  }

  async function loadPets(id) {
    await fetch(`https://${baseURL}/petsbyowner?id=${id}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setPets(json);
      });
  }

  useEffect(() => {
    loadOwner(id);
    loadPets(id);
  }, []);

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
        <Typography variant="h4">Emergency Contact</Typography>
        <ul>
          <li>Phone: {OWNER.ecphone}</li>
          <li>Email: {OWNER.ecemail}</li>
        </ul>
        <OwnerProfileTabs pets={pets} baseURL={baseURL} />
      </CardBody>
      <CardFooter className="gap-4 pet-profile-footer">
        <a href={""}>
          <Button>Edit</Button>
        </a>
      </CardFooter>
    </Card>
  ) : (
    <p>Owner could not be found.</p>
  );
}
