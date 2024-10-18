// to do: find a way to incorporate material tailwind date picker with search function instead of using native date picker to keep styling consistent
// to do: add more consistent/better styling to image upload
// to do: come up with alternative to select for breeds that doesn't rely on map, which is causing the selected option to render incorrectly sometimes
// to do: add common mixes to presets

import { useState, useEffect } from "react";
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
import { OWNERNAMES, CATBREEDS, DOGBREEDS } from "../utilities/dummydata";

export function CreatePetModal() {
  const [open, setOpen] = useState(false);
  const [species, setSpecies] = useState(null);
  const [catBreedList, setCatBreedList] = useState([]);
  const [dogBreedList, setDogBreedList] = useState([]);
  const [breed, setBreed] = useState(null);
  const [ownerid, setOwnerid] = useState(null);
  const handleOpen = () => setOpen((cur) => !cur);

  useEffect(() => {
    // species == "cat" ? setBreedList(CATBREEDS) : setBreedList(DOGBREEDS);
    loadCatBreeds();
    loadDogBreeds();
  }, [species]);

  function onSpeciesChange(value) {
    setSpecies(value);
  }

  function onOwnerChange(value) {
    setOwnerid(value);
  }

  function onBreedChange(value) {
    setBreed(value);
  }

  async function postPet(newPet) {
    await fetch("http://localhost:5000/pet", {
      method: "POST",
      body: JSON.stringify(newPet),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => console.log(data));
  }

  async function loadCatBreeds() {
    await fetch("http://localhost:5000/catbreeds")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        function alphabetize(a, b) {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          }
          return 0;
        }
        let presets = [
          { id: "Domestic Longhair", name: "Domestic Longhair" },
          { id: "Domestic Shorthair", name: "Domestic Shorthair" },
        ];
        let joinedList = data.concat(presets).sort(alphabetize);
        setCatBreedList(joinedList);
      });
  }

  async function loadDogBreeds() {
    await fetch("http://localhost:5000/dogbreeds")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        function alphabetize(a, b) {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          }
          return 0;
        }
        let presets = [{ id: "Mixed", name: "Mixed" }];
        let joinedList = data.concat(presets).sort(alphabetize);
        setDogBreedList(joinedList);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();

    let newPet = {
      ownerid: ownerid,
      petname: e.target.petname.value,
      sex: e.target.sex.value,
      altered: e.target.altered.value,
      species: species,
      breed: breed,
      birthday: e.target.birthday.value,
      weight: e.target.weight.value,
      physicaldesc: e.target.physicaldesc.value,
    };

    console.log(newPet);
    postPet(newPet);
    setOpen(false);
    setSpecies(null), setBreed(null), setOwnerid(null);
    e.target.reset();
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
          <form id="create-pet" onSubmit={handleSubmit}>
            <CardBody className="flex gap-6">
              {/* Column one */}
              <div className="mb-1 flex flex-col gap-6">
                {/* Owner's name dropdown */}
                <Select
                  label="Owner Name"
                  id="owners"
                  value={ownerid}
                  onChange={onOwnerChange}
                  required
                >
                  {OWNERNAMES.map((owner) => (
                    <Option key={owner.name} name={owner.name} value={owner.id}>
                      {owner.name}
                    </Option>
                  ))}
                </Select>
                {/* Pet name input */}
                <Input id="petname" label="Pet Name" required />
                {/* Sex radios */}
                <div className="flex gap-8">
                  <Radio name="sex" value="male" label="Male" required />
                  <Radio name="sex" value="female" label="Female" required />
                </div>
                {/* Altered radios */}
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
                {/* Species dropdown */}
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
                {/* Breed dropdown */}
                <Select
                  label="Breed"
                  id="breed"
                  value={breed}
                  onChange={onBreedChange}
                  disabled={!species}
                  required
                >
                  {species == "cat"
                    ? catBreedList.map((breed) => (
                        <Option
                          key={breed.id}
                          name={breed.name}
                          value={breed.name}
                        >
                          {breed.name}
                        </Option>
                      ))
                    : dogBreedList.map((breed) => (
                        <Option
                          key={breed.id}
                          name={breed.name}
                          value={breed.name}
                        >
                          {breed.name}
                        </Option>
                      ))}
                </Select>
                {/* Birthday input */}
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
                {/* Weight input */}
                <Input type="number" id="weight" label="Weight"></Input>
              </div>
              {/* Column two */}
              <div className="mb-1 flex flex-col gap-6">
                {/* Physical description input */}
                <div>
                  <Textarea
                    id="physicaldesc"
                    label="Physical Description"
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
                {/* Notes input */}
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
                {/* Photo upload */}
                <Button
                  color="blue-gray"
                  size="md"
                  className="flex flex-col items-center gap-6"
                  fullWidth
                >
                  <label html="imageupload">Upload a photo</label>
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
