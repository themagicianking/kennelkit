import { Select, Option } from "@material-tailwind/react";
import { useState } from "react";
import { CATBREEDS, DOGBREEDS } from "../utilities/dummydata";

export function BreedDropdown({ species }) {
  // const [breedList, setBreedList] = useState([]);
  const [breed, setBreed] = useState(null);
  let breedList = [];

  species == "cat" ? breedList = CATBREEDS : breedList = DOGBREEDS;

  function onBreedChange(value) {
    setBreed(value);
  }

  return (
    <>
      <Select
        label="Breed"
        id="breed"
        value={breed}
        onChange={onBreedChange}
        disabled={!species}
        required
      >
        {breedList.map((breed) => (
          <Option key={breed.name} name={breed.name} value={breed.value}>{breed.name}</Option>
        ))}
      </Select>
    </>
  );
}
