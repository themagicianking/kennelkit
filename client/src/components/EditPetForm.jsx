// to do: find a way to incorporate material tailwind date picker with search function instead of using native date picker to keep styling consistent
// to do: add more consistent/better styling to image upload
// to do: come up with alternative to select for breeds that doesn't rely on map, which is causing the selected option to render incorrectly sometimes
// to do: add common mixes to presets

import { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";

export function EditPetForm({ baseURL }) {
  let id = useParams().id;
  const [loading, setLoading] = useState(true);
  const [pet, setPet] = useState(null);
  const [species, setSpecies] = useState(null);
  const [catBreedListOptions, setCatBreedListOptions] = useState([]);
  const [dogBreedListOptions, setDogBreedListOptions] = useState([]);
  const [breed, setBreed] = useState(null);
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    loadPet(id);
    loadCatBreeds();
    loadDogBreeds();
  }, []);

  function onSpeciesChange(value) {
    setSpecies(value);
    setBreed(null);
  }

  function onBreedChange(value) {
    setBreed(value);
  }

  async function loadPet(id) {
    try {
      await fetch(`https://${baseURL}/pet?id=${id}`)
        .then((res) => {
          if (res.status >= 400) {
            throw res.status;
          }
          return res.json();
        })
        .then((json) => {
          setPet(json);
          setLoading(false);
          setSpecies(json.species);
          setBreed(json.breed);
          loadOwner(json.ownerid);
        });
    } catch (e) {
      setPet(null);
      setLoading(false);
      console.log("Could not fetch pet.");
    }
  }

  async function loadOwner(id) {
    try {
      await fetch(`https://${baseURL}/owner?id=${id}`)
        .then((res) => {
          if (res.status >= 400) {
            throw res.status;
          }
          return res.json();
        })
        .then((json) => {
          setOwner(json);
          setLoading(false);
        });
    } catch (e) {
      setOwner(null);
      setLoading(false);
      console.log("Could not fetch owner.");
    }
  }

  async function editPet(editedPet) {
    await fetch(`https://${baseURL}/pet`, {
      method: "PUT",
      body: JSON.stringify(editedPet),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => console.log("Server response:", json));
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
    await fetch(`https://${baseURL}/dogbreeds`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setDogBreedListOptions(createBreedListOptions(json));
      });
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
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return pet || owner ? (
    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="rounded-b-none"
      >
        <Typography variant="h2">Edit {pet.petname} Lastname</Typography>
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
                <Radio name="sex" value="female" label="Female" required />
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
          </div>
        </CardBody>
        <CardFooter>
          <Button type="submit">Submit</Button>
        </CardFooter>
      </form>
    </Card>
  ) : (
    <p>Could not find pet.</p>
  );
}
