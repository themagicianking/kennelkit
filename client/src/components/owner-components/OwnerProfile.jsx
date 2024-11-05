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
} from "@material-tailwind/react";
import { DefaultSkeleton } from "../LoadingScreen";

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
    return <DefaultSkeleton />;
  }

  return owner ? (
    <div className="profile-container">
      <Card shadow={true} variant="gradient" className="owner-profile">
        <CardHeader
          floated={false}
          className="rounded-b-none profile-header"
        >
          <h2>
            {owner.firstname} {owner.lastname}
          </h2>
        </CardHeader>
        <CardBody className="profile-body">
          <div className="owner-contact-info gap-4">
            <h3>Contact Information</h3>
            <ul>
              <li>
                Phone: ({owner.phone.slice(0, 3)}) - {owner.phone.slice(3, 6)} -
                {owner.phone.slice(6)}
              </li>
              <li>Email: {owner.email}</li>
            </ul>
            {/* Emergency contact currently uses dummy data, as there is no emergency contact table. */}
            <h3>Emergency Contact</h3>
            <ul>
              <li>Phone: Emergency contact phone</li>
              <li>Email: Emergency contact email</li>
            </ul>
          </div>
          <OwnerProfileTabs pets={pets} />
        </CardBody>
        <CardFooter className="gap-4 profile-footer">
          <EditOwnerForm owner={owner} />
        </CardFooter>
      </Card>
    </div>
  ) : (
    <div className="profile-container">
      <p>{errorMessage}</p>
    </div>
  );
}
