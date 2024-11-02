import { useState } from "react";
import { useServerName } from "../../ServerNameProvider";
import {
  Button,
  Card,
  CardHeader,
  Dialog,
  Typography,
  CardBody,
  Input,
  CardFooter,
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
        .then((json) => {
          console.log("Server response:", json);
          setSubmitMessage("Owner has been created!");
        });
    } catch (e) {
      console.log("Could not create owner. The following error occurred:", e);
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

    console.log("Request body:", newOwner);
    postOwner(newOwner);
    e.target.reset();
    setSubmitted(true);
  }

  return (
    <>
      <Button onClick={() => handleOpen("xxl")}>
        <i className="fas fa-plus" /> Create an Owner
      </Button>
      <Dialog open={open} handler={handleOpen} size={"xxl"}>
        {!submitted ? (
          <Card>
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="rounded-b-none"
            >
              <Typography variant="h2">Create an Owner</Typography>
            </CardHeader>
            <form id="create-pet" onSubmit={handleSubmit}>
              <CardBody className="flex gap-6">
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
              <CardFooter>
                <Button onClick={handleOpen}>Cancel</Button>
                <Button type="submit">Submit</Button>
              </CardFooter>
            </form>
          </Card>
        ) : (
          <Card>
            <CardBody className="flex gap-6">
              <p>{submitMessage}</p>
            </CardBody>
            <CardFooter>
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
