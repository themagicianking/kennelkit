import { useState } from "react";
import { useServerName } from "../../ServerNameProvider";
import {
  Button,
  Card,
  CardHeader,
  Dialog,
  CardBody,
  Input,
  CardFooter,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";

export function CreateOwnerForm() {
  const serverName = useServerName();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  const handleOpen = () => setOpen(!open);

  async function postOwner(newOwner) {
    try {
      await fetch(`https://${serverName}/owner`, {
        method: "POST",
        body: JSON.stringify(newOwner),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (res.status >= 400) {
            throw res.status;
          }
          return res.json();
        })
        .then(() => {
          setSubmitMessage("Owner has been created!");
        });
    } catch (e) {
      setSubmitMessage(
        `Could not create owner. The following error occurred: ${e}`
      );
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    let newOwner = {
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
    };
    postOwner(newOwner);
    e.target.reset();
    setSubmitted(true);
  }

  return (
    <>
      <ListItem onClick={handleOpen} className="navtab form-tab">
        <ListItemPrefix>
          <i className="fas fa-plus" />
        </ListItemPrefix>
        <h3>Create an Owner</h3>
      </ListItem>
      <Dialog open={open} handler={handleOpen} size={"xs"}>
        {!submitted ? (
          <Card>
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="rounded-b-none"
            >
              <h1>Create an Owner</h1>
            </CardHeader>
            <form id="create-pet" onSubmit={handleSubmit}>
              <CardBody className="flex flex-col gap-6">
                <Input
                  id="firstname"
                  label="First Name"
                  type="text"
                  required
                ></Input>
                <Input
                  id="lastname"
                  label="Last Name"
                  type="text"
                  required
                ></Input>
                <Input
                  id="phone"
                  label="Phone"
                  placeholder="(123) 456 - 7890"
                  type="tel"
                  pattern="[0-9]{10}"
                  required
                ></Input>
                <Input
                  id="email"
                  label="Email"
                  placeholder="email@email.com"
                  type="email"
                  required
                ></Input>
              </CardBody>
              <CardFooter className="flex gap-4 justify-end">
                <Button onClick={handleOpen}>Cancel</Button>
                <Button type="submit" color="green">
                  Submit
                </Button>
              </CardFooter>
            </form>
          </Card>
        ) : (
          <Card>
            <CardBody className="flex gap-6">
              <p>{submitMessage}</p>
            </CardBody>
            <CardFooter className="flex gap-4 justify-end">
              <Button
                onClick={() => {
                  handleOpen();
                  setSubmitted(false);
                }}
              >
                Close
              </Button>
            </CardFooter>
          </Card>
        )}
      </Dialog>
    </>
  );
}
