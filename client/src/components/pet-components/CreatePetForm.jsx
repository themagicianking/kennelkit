/* eslint-disable react-hooks/exhaustive-deps */
// to do: figure out how to completely clear list when species is changed
import { useState, useEffect } from "react";
import { useServerName } from "../../ServerNameProvider";
import { DropdownFilter } from "./DropdownFilter";
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
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";

export function CreatePetForm() {
  const serverName = useServerName();
  const [species, setSpecies] = useState(null);
  const [catBreedListOptions, setCatBreedListOptions] = useState([]);
  const [dogBreedListOptions, setDogBreedListOptions] = useState([]);
  const [breed, setBreed] = useState(null);
  const [ownerListOptions, setOwnerListOptions] = useState([]);
  const [ownerid, setOwnerid] = useState(null);
  const [open, setOpen] = useState(false);
  const [ownerErrorMessage, setOwnerErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    loadOwners();
    loadCatBreeds();
    loadDogBreeds();
  }, []);

  const handleOpen = () => setOpen(!open);

  function createOwnerListOptions(ownerListOptions) {
    return ownerListOptions.map((owner) => ({
      value: owner.id,
      label: `${owner.firstname} ${owner.lastname}`,
    }));
  }

  function createBreedListOptions(currentBreedList) {
    return currentBreedList.map((breed) => ({
      value: breed.name,
      label: breed.name,
    }));
  }

  async function loadOwners() {
    try {
      await fetch(`https://${serverName}/allowners`)
        .then((res) => {
          if (res.status >= 400) {
            throw res.status;
          }
          return res.json();
        })
        .then((json) => {
          setOwnerListOptions(createOwnerListOptions(json));
        });
    } catch (e) {
      setOwnerErrorMessage(
        `Could not get owners. The following error occurred: ${e}`
      );
    }
  }

  async function loadCatBreeds() {
    try {
      await fetch(`https://${serverName}/catbreeds`)
        .then((res) => {
          if (res.status >= 400) {
            throw res.status;
          }
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
          if (res.status >= 400) {
            throw res.status;
          }
          return res.json();
        })
        .then((json) => {
          setDogBreedListOptions(createBreedListOptions(json));
        });
    } catch (e) {
      console.log("Could not get dog breeds. The following error occurred:", e);
    }
  }

  async function postPet(newPet) {
    try {
      await fetch(`https://${serverName}/pet`, {
        method: "POST",
        body: JSON.stringify(newPet),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (res.status >= 400) {
            throw res.status;
          }
          return res.json();
        })
        .then((json) => {
          console.log("Server response:", json);
          setSubmitMessage("Pet has been created!");
        });
    } catch (e) {
      setSubmitMessage(
        `Could not create pet. The following error occurred: ${e}`
      );
    }
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
      staytype: "daycare",
    };

    console.log("Request body:", newPet);
    postPet(newPet);
    setSpecies(null), setBreed(null), setOwnerid(null);
    e.target.reset();
    setSubmitted(true);
  }

  return (
    <>
      <ListItem onClick={handleOpen} className="navtab form-tab">
        <ListItemPrefix>
          <i className="fas fa-plus" />
        </ListItemPrefix>
        <h3>Create a Pet</h3>
      </ListItem>
      <Dialog open={open} handler={handleOpen} size={"l"}>
        {!submitted ? (
          <Card>
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="rounded-b-none"
            >
              <h1>Create a Pet</h1>
            </CardHeader>
            <form id="create-pet" onSubmit={handleSubmit}>
              <CardBody className="create-pet-form">
                {/* Column one */}
                <div className="create-pet-form-req-info gap-4">
                  {/* Owner's name dropdown */}
                  <>
                    {ownerListOptions ? (
                      <DropdownFilter
                        label="owners"
                        options={ownerListOptions}
                        placeholder="Owner Name"
                        onChange={(owner) => setOwnerid(owner.value)}
                        isDisabled={false}
                        required
                      />
                    ) : (
                      <p>{ownerErrorMessage}</p>
                    )}
                  </>
                  {/* Pet name input */}
                  <Input id="petname" label="Pet Name" required />
                  {/* Sex radios */}
                  <div>
                    <p>
                      Sex <span style={{ color: "red" }}>*</span>
                    </p>
                    <Radio name="sex" value="male" label="Male" required />
                    <Radio name="sex" value="female" label="Female" required />
                  </div>
                  {/* Altered radios */}
                  <div>
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
                      required
                    />
                  </div>
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
                      placeholder="Breeds"
                      onChange={(breed) => setBreed(breed.value)}
                      isDisabled={!species}
                      required
                    />
                  ) : (
                    <DropdownFilter
                      options={dogBreedListOptions}
                      placeholder="Breeds"
                      onChange={(breed) => setBreed(breed.name)}
                      isDisabled={!species}
                      required
                    />
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
                  <Input
                    type="number"
                    id="weight"
                    label="Weight"
                    required
                  ></Input>
                </div>
                {/* Column two */}
                <div className="create-pet-form-opt-info gap-4">
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
                  {/* Photo upload */}
                  <Input
                    name="imageupload"
                    type="file"
                    accept="image/png, image/jpeg"
                    label="Upload an image"
                  ></Input>
                  {/* </Button> */}
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
            <CardBody>{submitMessage}</CardBody>
            <CardFooter className="flex gap-4 justify-end">
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
