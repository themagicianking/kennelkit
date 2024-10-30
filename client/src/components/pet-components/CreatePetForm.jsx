// to do: find a way to incorporate material tailwind date picker with search function instead of using native date picker to keep styling consistent
// to do: add more consistent/better styling to image upload
// to do: come up with alternative to select for breeds that doesn't rely on map, which is causing the selected option to render incorrectly sometimes

import { useState, useEffect } from "react";
import { useBaseLink } from "../../BaseLinkProvider";
import {
  Button,
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
import { DropdownFilter } from "./DropdownFilter";

export function CreatePetForm({ baseURL }) {
  const [species, setSpecies] = useState(null);
  const [catBreedListOptions, setCatBreedListOptions] = useState([]);
  const [dogBreedListOptions, setDogBreedListOptions] = useState([]);
  const [breed, setBreed] = useState(null);
  const [ownerListOptions, setOwnerListOptions] = useState([]);
  const [ownerid, setOwnerid] = useState(null);
  const link = useBaseLink();

  useEffect(() => {
    loadOwners();
    loadCatBreeds();
    loadDogBreeds();
  }, []);

  function onSpeciesChange(value) {
    setSpecies(value);
    setBreed(null);
  }

  function onOwnerChange(owner) {
    setOwnerid(owner.value);
  }

  function onBreedChange(value) {
    setBreed(value);
  }

  async function postPet(newPet) {
    await fetch(`https://${link}/pet`, {
      method: "POST",
      body: JSON.stringify(newPet),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => console.log("Server response:", json));
  }

  async function loadOwners() {
    await fetch(`https://${link}/allowners`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setOwnerListOptions(createOwnerListOptions(json));
      });
  }

  async function loadCatBreeds() {
    await fetch(`https://${baseURL}/catbreeds`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setCatBreedListOptions(createBreedListOptions(json));
      });
  }

  async function loadDogBreeds() {
    await fetch(`https://${link}/dogbreeds`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setDogBreedListOptions(createBreedListOptions(json));
      });
  }

  function createOwnerListOptions(ownerListOptions) {
    return ownerListOptions.map((owner) => ({
      value: owner.id,
      label: `${owner.firstname} ${owner.lastname}`,
    }));
  }

  function createBreedListOptions(currentBreedList) {
    let breedOptionsList = currentBreedList.map((breed) => (
      <Option key={breed.id} name={breed.name} value={breed.name}>
        {breed.name}
      </Option>
    ));

    return breedOptionsList;
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

    console.log("Request body:", newPet);
    postPet(newPet);
    setSpecies(null), setBreed(null), setOwnerid(null);
    e.target.reset();
  }

  return (
    <>
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
              {ownerListOptions ? (
                <DropdownFilter
                  options={ownerListOptions}
                  placeholder="Owner Name"
                  onChange={onOwnerChange}
                  required
                />
              ) : (
                <></>
              )}
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
              {/* Breed dropdown (while disabled) */}
              {!species ? (
                <Select label="Breed" id="breed" disabled={!species}>
                  <Option key={null} name={null} value={null}>
                    Breed
                  </Option>
                </Select>
              ) : (
                <></>
              )}
              {/* Cat dropdown */}
              {species == "cat" ? (
                <Select
                  label="Breed"
                  id="breed"
                  value={breed}
                  onChange={onBreedChange}
                  disabled={!species}
                  required
                >
                  {catBreedListOptions}
                </Select>
              ) : (
                <></>
              )}
              {/* Dog dropdown */}
              {species == "dog" ? (
                <Select
                  label="Breed"
                  id="breed"
                  value={breed}
                  onChange={onBreedChange}
                  disabled={!species}
                  required
                >
                  {dogBreedListOptions}
                </Select>
              ) : (
                <></>
              )}
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
              <Input type="number" id="weight" label="Weight" required></Input>
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
    </>
  );
}
