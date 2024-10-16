import { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  Typography,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

export default function CreatePetModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <Button onClick={handleOpen}>Create Pet</Button>
      <Dialog open={open} handler={handleOpen}>
        <Card>
          <CardHeader>
            <Typography variant="h2">Create a Pet</Typography>
          </CardHeader>
          <CardBody>Insert all the things needed here</CardBody>
          <CardFooter><Button>Submit</Button></CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
