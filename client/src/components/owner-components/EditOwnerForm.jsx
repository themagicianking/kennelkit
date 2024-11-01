// to do: add callback function to rerender owner profile upon edit

import {
  Button,
  Card,
  CardHeader,
  Typography,
  CardBody,
  Dialog,
  Input,
  CardFooter,
} from "@material-tailwind/react";
import { useState } from "react";
import { useServerName } from "../../ServerNameProvider";

export function EditOwnerForm({ owner }) {
  const [size, setSize] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const serverName = useServerName();

  const handleOpen = (value) => setSize(value);

  async function editOwner(editedOwner) {
    await fetch(`https://${serverName}/owner`, {
      method: "PUT",
      body: JSON.stringify(editedOwner),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.status >= 400) {
          throw res.status;
        }
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
    setSubmitted(true);
  }

  return (
    <>
      <Button onClick={() => handleOpen("xxl")}>Edit</Button>
      <Dialog open={size === "xxl"} handler={handleOpen} size={size || "xxl"}>
        {!submitted ? (
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
                  required
                ></Input>
                <Input
                  id="lastname"
                  label="Last Name"
                  defaultValue={owner.lastname}
                  required
                ></Input>
                <Input
                  id="phone"
                  label="Phone"
                  type="tel"
                  pattern="[0-9]{10}"
                  defaultValue={owner.phone}
                  required
                ></Input>
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  defaultValue={owner.email}
                  required
                ></Input>
              </CardBody>
              <CardFooter>
                <Button onClick={() => handleOpen(null)}>Cancel</Button>
                <Button type="submit">Submit</Button>
              </CardFooter>
            </form>
          </Card>
        ) : (
          <Card>
            <CardBody className="flex gap-6">Owner has been created!</CardBody>
            <CardFooter>
              <Button onClick={() => handleOpen(null)}>Close</Button>
            </CardFooter>
          </Card>
        )}
      </Dialog>
    </>
  );
}
