/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
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
import { DropdownFilter } from "./DropdownFilter";

export function EditPetForm({ pet, owner }) {
  const serverName = useServerName();
  const [species, setSpecies] = useState(pet.species);
  const [catBreedListOptions, setCatBreedListOptions] = useState([]);
  const [dogBreedListOptions, setDogBreedListOptions] = useState([]);
  const [breed, setBreed] = useState(pet.breed);
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    loadCatBreeds();
    loadDogBreeds();
  }, []);

  const handleOpen = () => setOpen(!open);

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
    return currentBreedList.map((breed) => ({
      value: breed.name,
      label: breed.name,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    let altered;

    if (e.target.altered.value == "altered") {
      altered = true;
    } else {
      altered = false;
    }

    let editedPet = {
      id: pet.id,
      petname: e.target.petname.value,
      sex: e.target.sex.value,
      altered: altered,
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
      <Button onClick={handleOpen} className="ml-4">
        Edit
      </Button>
      <Dialog open={open} handler={handleOpen} size={"l"}>
        {!submitted ? (
          <Card>
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="rounded-b-none"
            >
              <h2>
                Edit {pet.petname} {owner.lastname}
              </h2>
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
                    <div className="flex flex-col">
                      <p>
                        Sex <span style={{ color: "red" }}>*</span>
                      </p>
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
                    <div className="flex flex-col">
                      <p>
                        Altered <span style={{ color: "red" }}>*</span>
                      </p>
                      <Radio
                        name="altered"
                        value={true}
                        label="Altered"
                        defaultChecked
                        required
                      />
                      <Radio
                        name="altered"
                        value={false}
                        label="Unaltered"
                        required
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <p>
                        Altered <span style={{ color: "red" }}>*</span>
                      </p>
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
                    onChange={(value) => {
                      setSpecies(value);
                      setBreed(null);
                    }}
                    required
                  >
                    <Option name="species" value="dog">
                      Dog
                    </Option>
                    <Option name="species" value="cat">
                      Cat
                    </Option>
                  </Select>
                  {/* Breed dropdowns */}
                  {species == "cat" ? (
                    <DropdownFilter
                      options={catBreedListOptions}
                      placeholder={breed}
                      onChange={(breed) => setBreed(breed.value)}
                      isDisabled={!species}
                      required
                    />
                  ) : (
                    <DropdownFilter
                      options={dogBreedListOptions}
                      placeholder={breed}
                      onChange={(breed) => setBreed(breed.name)}
                      isDisabled={!species}
                      required
                    />
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
              <CardFooter className="flex gap-4 justify-end">
                <Button onClick={handleOpen}>Cancel</Button>
                <Button type="submit" color="green">
                  Submit
                </Button>
              </CardFooter>
            </form>
          </Card>
        ) : (
          <Card>
            <CardBody className="flex gap-6">Pet has been edited!</CardBody>
            <CardFooter className="justify-end">
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

EditPetForm.propTypes = {
  pet: PropTypes.object.isRequired,
  owner: PropTypes.object.isRequired,
};
