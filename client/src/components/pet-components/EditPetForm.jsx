// to do: find a way to incorporate material tailwind date picker with search function instead of using native date picker to keep styling consistent
// to do: add more consistent/better styling to image upload
// to do: come up with alternative to select for breeds that doesn't rely on map, which is causing the selected option to render incorrectly sometimes
// to do: add common mixes to presets
// to do: create callback function that updates pet profile when an edit has been submitted using useeffect

import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  Dialog,
  Typography,
  CardBody,
  Input,
  Radio,
  Select,
  Option,
  Textarea,
  CardFooter,
} from "@material-tailwind/react";
import { useServerName } from "../../ServerNameProvider";

export function EditPetForm({ pet, owner }) {
  const [species, setSpecies] = useState(null);
  const [catBreedListOptions, setCatBreedListOptions] = useState([]);
  const [dogBreedListOptions, setDogBreedListOptions] = useState([]);
  const [breed, setBreed] = useState(null);
  const [size, setSize] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const serverName = useServerName();

  useEffect(() => {
    loadCatBreeds();
    loadDogBreeds();
  }, []);

  const handleOpen = (value) => setSize(value);

  function onSpeciesChange(value) {
    setSpecies(value);
    setBreed(null);
  }

  function onBreedChange(value) {
    setBreed(value);
  }

  async function editPet(editedPet) {
    try {
      await fetch(`https://${serverName}/pet`, {
        method: "PUT",
        body: JSON.stringify(editedPet),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          return res.json();
        })
        .then((json) => console.log("Server response:", json));
    } catch (e) {
      console.log("Could not update pet. The following error occurred:", e);
    }
  }

  async function loadCatBreeds() {
    try {
      await fetch(`https://${serverName}/catbreeds`)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          setCatBreedListOptions(createBreedListOptions(json));
        });
    } catch (e) {
      console.log("Could not get cat breeds. The following error occurred:", e);
    }
  }

  async function loadDogBreeds() {
    try {
      await fetch(`https://${serverName}/dogbreeds`)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          setDogBreedListOptions(createBreedListOptions(json));
        });
    } catch (e) {
      console.log("Could not get dog breeds. The following error occurred:", e);
    }
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

    let editedPet = {
      id: pet.id,
      petname: e.target.petname.value,
      sex: e.target.sex.value,
      altered: e.target.altered.value,
      species: species,
      breed: breed,
      weight: e.target.weight.value,
      physicaldesc: e.target.physicaldesc.value,
    };

    console.log("Request body:", editedPet);
    editPet(editedPet);
    setSubmitted(true);
  }

  return (
    <>
      <Button onClick={() => handleOpen("xxl")}>Edit</Button>
      <Dialog open={size === "xxl"} handler={handleOpen} size={size || "xxl"}>
        {!submitted ? (
          <Card>
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="rounded-b-none"
            >
              <Typography variant="h2">
                Edit {pet.petname} {owner.lastname}
              </Typography>
            </CardHeader>
            <form id="create-pet" onSubmit={handleSubmit}>
              <CardBody className="flex gap-6">
                {/* Column one */}
                <div className="mb-1 flex flex-col gap-6">
                  {/* Owner's name dropdown */}
                  <Input
                    id="owner"
                    label="Owner Name"
                    defaultValue={`${owner.firstname} ${owner.lastname}`}
                    disabled
                  ></Input>
                  <Input
                    id="petname"
                    label="Pet Name"
                    defaultValue={pet.petname}
                    disabled
                  />
                  {/* Sex radios */}
                  {pet.sex == "male" ? (
                    <div className="flex gap-8">
                      <Radio
                        name="sex"
                        value="male"
                        label="Male"
                        required
                        defaultChecked
                      />
                      <Radio
                        name="sex"
                        value="female"
                        label="Female"
                        required
                      />
                    </div>
                  ) : (
                    <div className="flex gap-8">
                      <Radio name="sex" value="male" label="Male" required />
                      <Radio
                        name="sex"
                        value="female"
                        label="Female"
                        required
                        defaultChecked
                      />
                    </div>
                  )}
                  {/* Altered radios */}
                  {pet.altered ? (
                    <div className="flex gap-4">
                      <Radio
                        name="altered"
                        value="altered"
                        label="Altered"
                        defaultChecked
                        required
                      />
                      <Radio
                        name="altered"
                        value="unaltered"
                        label="Unaltered"
                        required
                      />
                    </div>
                  ) : (
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
                        defaultChecked
                        required
                      />
                    </div>
                  )}
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
                  {/* Weight input */}
                  <Input
                    type="number"
                    id="weight"
                    label="Weight"
                    defaultValue={pet.weight}
                  ></Input>
                </div>
                {/* Column two */}
                <div className="mb-1 flex flex-col gap-6">
                  {/* Physical description input */}
                  <div>
                    <Textarea
                      id="physicaldesc"
                      label="Physical Description"
                      defaultValue={pet.physicaldesc}
                    ></Textarea>
                    <Typography
                      variant="small"
                      color="gray"
                      className="mt-2 flex items-center gap-2 font-normal"
                    >
                      <i className="fas fa-circle-info"></i>
                      Physical description: coat color and type, markings,
                      unusual features
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
                      <i className="fas fa-circle-info"></i>Personality,
                      specific concerns or quirks
                    </Typography>
                  </div>
                </div>
              </CardBody>
              <CardFooter>
                <Button onClick={() => handleOpen(null)}>Cancel</Button>
                <Button type="submit">Submit</Button>
              </CardFooter>
            </form>
          </Card>
        ) : (
          <Card>
            <CardBody className="flex gap-6">Pet has been edited!</CardBody>
            <CardFooter>
              <Button onClick={() => handleOpen(null)}>Close</Button>
            </CardFooter>
          </Card>
        )}
      </Dialog>
    </>
  );
}
