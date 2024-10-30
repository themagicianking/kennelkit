import { useBaseLink } from "../../BaseLinkProvider";
import {
  Button,
  Card,
  CardHeader,
  Typography,
  CardBody,
  Input,
  CardFooter,
} from "@material-tailwind/react";

export function CreateOwnerForm() {
  const link = useBaseLink();
  async function postOwner(newOwner) {
    try {
      await fetch(`https://${link}/owner`, {
        method: "POST",
        body: JSON.stringify(newOwner),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          return res.json();
        })
        .then((json) => console.log("Server response:", json));
    } catch (e) {
      console.log("Could not create owner. The following error occurred:", e);
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
  }

  return (
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
          <Input id="firstname" label="First Name"></Input>
          <Input id="lastname" label="Last Name"></Input>
          <Input
            id="phone"
            label="Phone"
            placeholder="(123) 456 - 7890"
            type="tel"
            pattern="[0-9]{10}"
          ></Input>
          <Input
            id="email"
            label="Email"
            placeholder="email@email.com"
            type="email"
          ></Input>
        </CardBody>
        <CardFooter>
          <Button type="submit">Submit</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
