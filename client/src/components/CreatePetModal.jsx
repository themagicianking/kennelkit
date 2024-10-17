// to do: find a way to incorporate material tailwind date picker with search function instead of using native date picker to keep styling consistent
// to do: add more consistent/better styling to image upload
// to do: add styling to owner name and breed so they match hard coded list options
// to do: collapse number of names appearing in owner search

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
import { OWNERNAMES, BREED } from "../utilities/dummydata";

export function CreatePetModal() {
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
              <Input list="owners" label="Owner Name" required/>
              <datalist id="owners">
                {OWNERNAMES.map((name) => (
                  <option value={name.value} />
                ))}
              </datalist>
              <Input label="Pet Name" required/>
              <div className="flex gap-10">
                <Radio name="sex" label="Male" required/>
                <Radio name="sex" label="Female" required/>
              </div>
              <div className="flex gap-10">
                <Radio name="altered" label="Altered" required/>
                <Radio name="altered" label="Unaltered" required/>
              </div>
              <Select label="Species" required>
                <Option>Dog</Option>
                <Option>Cat</Option>
              </Select>
              <Input list="breed" label="Breed" required/>
              <datalist id="breed">
                {BREED.map((breed) => (
                  <option value={breed.value} />
                ))}
              </datalist>
              <Input type="date" label="Birthday" required></Input>
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
