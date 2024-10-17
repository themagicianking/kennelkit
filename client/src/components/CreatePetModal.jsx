// to do: find a way to incorporate material tailwind date picker with search function instead of using native date picker to keep styling consistent
// to do: add more consistent/better styling to image upload

import { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  Typography,
  CardBody,
  Input,
  Radio,
  Select,
  Option,
  Textarea,
  CardFooter,
} from "@material-tailwind/react";
import AsyncSelect from "react-select";

const OWNERS = []

export default function CreatePetModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <Button onClick={handleOpen}>Create Pet</Button>
      <Dialog open={open} handler={handleOpen}>
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="rounded-b-none"
          >
            <Typography variant="h2">Create a Pet</Typography>
          </CardHeader>
          <CardBody className="flex gap-6">
            <div className="mb-1 flex flex-col gap-6">
              {/* Owner selection */}
              <AsyncSelect placeholder="Owner Name"></AsyncSelect>
              <Input label="Pet Name"></Input>
              <div className="flex gap-10">
                <Radio name="type" label="Male" />
                <Radio name="type" label="Female" />
              </div>
              <div className="flex gap-10">
                <Radio name="type" label="Altered" />
                <Radio name="type" label="Unaltered" />
              </div>
              <Select label="Species">
                <Option>Dog</Option>
                <Option>Cat</Option>
              </Select>
              {/* Breed selection */}
              <AsyncSelect placeholder="Breed"></AsyncSelect>
              <Input type="date" label="Birthday"></Input>
              <Input type="number" label="Weight"></Input>
            </div>
            <div className="mb-1 flex flex-col gap-6">
              <Textarea placeholder="Physical description: coat color and type, markings, unusual features"></Textarea>
              <Textarea label="Notes"></Textarea>
              <Input type="file" accept="image/png, image/jpeg"></Input>
            </div>
          </CardBody>
          <CardFooter>
            <Button>Submit</Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
