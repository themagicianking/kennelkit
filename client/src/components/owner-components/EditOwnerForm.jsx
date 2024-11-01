import PropTypes from "prop-types";
import { useState } from "react";
import { PUT } from "../../utilities/server-endpoints";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dialog,
  Input,
  Typography,
} from "@material-tailwind/react";

export function EditOwnerForm({ owner }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleOpen = () => setOpen(!open);

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
    PUT.editOwner(editedOwner);
    e.target.reset();
    setSubmitted(true);
  }

  return (
    <>
      <Button onClick={handleOpen}>Edit</Button>
      <Dialog open={open} handler={handleOpen} size={"xxl"}>
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
                <Button onClick={handleOpen}>Cancel</Button>
                <Button type="submit">Submit</Button>
              </CardFooter>
            </form>
          </Card>
        ) : (
          <Card>
            <CardBody className="flex gap-6">Owner has been edited!</CardBody>
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

EditOwnerForm.propTypes = {
  owner: PropTypes.object.isRequired,
};
