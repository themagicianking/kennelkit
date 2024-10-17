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
  const [species, setSpecies] = useState(null);
  const handleOpen = () => setOpen((cur) => !cur);

  function onSpeciesChange(value) {
    setSpecies(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let newPet = {
      petname: e.target.petname.value,
      sex: e.target.sex.value,
      altered: e.target.altered.value,
      species: species,
      breed: e.target.breed.value,
      birthday: e.target.birthday.value,
      weight: e.target.weight.value,
      physicaldesc: e.target.physicaldesc.value,
    };

    console.log(newPet);
    console.log("this ran");
  }

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
          <form onSubmit={handleSubmit}>
            <CardBody className="flex gap-6">
              <div className="mb-1 flex flex-col gap-6">
                <Input list="owners" label="Owner Name" required />
                <datalist id="owners">
                  {OWNERNAMES.map((name) => (
                    <option value={name.value} />
                  ))}
                </datalist>
                <Input id="petname" label="Pet Name" required />
                <div className="flex gap-8">
                  <Radio name="sex" value="male" label="Male" required />
                  <Radio name="sex" value="female" label="Female" required />
                </div>
                <div className="flex gap-4">
                  <Radio
                    name="altered"
                    value="altered"
                    label="Altered"
                    required
                  />
                  <Radio
                    name="altered"
                    value="unaltered"
                    label="Unaltered"
                    required
                  />
                </div>
                <Select
                  label="Species"
                  id="species"
                  value={species}
                  onChange={onSpeciesChange}
                  required
                >
                  <Option name="species" value="dog">
                    Dog
                  </Option>
                  <Option name="species" value="cat">
                    Cat
                  </Option>
                </Select>
                <Input list="breed" id="breed" label="Breed" required />
                <datalist id="breed">
                  {BREED.map((breed) => (
                    <option key={breed.value} value={breed.value} />
                  ))}
                </datalist>
                <div>
                  <Input
                    type="date"
                    id="birthday"
                    label="Birthday"
                    required
                  ></Input>
                  <Typography
                    variant="small"
                    color="gray"
                    className="mt-2 flex items-center gap-2 font-normal"
                  >
                    <i className="fas fa-asterisk"></i>
                    Or best estimate
                  </Typography>
                </div>
                <Input type="number" id="weight" label="Weight"></Input>
              </div>
              <div className="mb-1 flex flex-col gap-6">
                <div>
                  <Textarea
                    id="physicaldesc"
                    label="Physical Description"
                    // placeholder="Physical description: coat color and type, markings, unusual features"
                  ></Textarea>
                  <Typography
                    variant="small"
                    color="gray"
                    className="mt-2 flex items-center gap-2 font-normal"
                  >
                    <i className="fas fa-circle-info"></i>
                    Physical description: coat color and type, markings, unusual
                    features
                  </Typography>
                </div>
                <div>
                  <Textarea label="Notes"></Textarea>
                  <Typography
                    variant="small"
                    color="gray"
                    className="mt-2 flex items-center gap-2 font-normal"
                  >
                    <i className="fas fa-circle-info"></i>Personality, specific
                    concerns or quirks
                  </Typography>
                </div>
                <Button
                  color="blue-gray"
                  size="md"
                  className="flex flex-col items-center gap-6"
                  fullWidth
                >
                  <label forHtml="imageupload">Upload a photo</label>
                  <input
                    name="imageupload"
                    type="file"
                    accept="image/png, image/jpeg"
                  ></input>
                </Button>
              </div>
            </CardBody>
            <CardFooter>
              <Button type="submit">Submit</Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </>
  );
}
