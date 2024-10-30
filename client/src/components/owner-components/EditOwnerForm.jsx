import {
  Button,
  Card,
  CardHeader,
  Typography,
  CardBody,
  Input,
  CardFooter,
} from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useBaseLink } from "../../BaseLinkProvider";

export function EditOwnerForm() {
  let id = useParams().id;
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const link = useBaseLink();

  useEffect(() => {
    loadOwner(id);
  }, []);

  async function loadOwner(id) {
    try {
      await fetch(`https://${link}/ownerbyid?id=${id}`)
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
      console.log("Could not get owner. The following error occurred:", e);
    }
  }

  async function editOwner(editedOwner) {
    await fetch(`https://${link}/owner`, {
      method: "PUT",
      body: JSON.stringify(editedOwner),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => console.log("Server response:", json));
  }

  function handleSubmit(e) {
    e.preventDefault();

    let editedOwner = {
      id: owner.id,
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
    };

    console.log("Request body:", editedOwner);
    editOwner(editedOwner);
    e.target.reset();
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return owner ? (
    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="rounded-b-none"
      >
        <Typography variant="h2">
          Edit {owner.firstname} {owner.lastname}
        </Typography>
      </CardHeader>
      <form id="create-pet" onSubmit={handleSubmit}>
        <CardBody className="flex gap-6">
          <Input
            id="firstname"
            label="First Name"
            defaultValue={owner.firstname}
          ></Input>
          <Input
            id="lastname"
            label="Last Name"
            defaultValue={owner.lastname}
          ></Input>
          <Input
            id="phone"
            label="Phone"
            placeholder="(123) 456 - 7890"
            type="tel"
            pattern="[0-9]{10}"
            defaultValue={owner.phone}
          ></Input>
          <Input
            id="email"
            label="Email"
            placeholder="email@email.com"
            type="email"
            defaultValue={owner.email}
          ></Input>
        </CardBody>
        <CardFooter>
          <Button type="submit">Submit</Button>
        </CardFooter>
      </form>
    </Card>
  ) : (
    <p>Owner could not be found.</p>
  );
}
