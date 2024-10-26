// importing needed modules
import express from "express";
import cors from "cors";
import "dotenv/config";
import https from "https";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
// importing custom sequelize class
import databaseHelper from "./databasehelper.js";

// create express app
const APP = express();
APP.use(express.json());
APP.use(cors());

// get directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// environment variables
const APP_ENV = process.env.APP_ENV;
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// creates a sequelize instance
const dbhelper = new databaseHelper(DATABASE_URL);

// pull cat & dog breeds from api, add them to preset list of breeds, and insert them into breeds table
async function populateBreedsTable() {
  const dogBreeds = await dbhelper.Breed.findAll({
    where: {
      species: "dog",
    },
  });
  const catBreeds = await dbhelper.Breed.findAll({
    where: {
      species: "cat",
    },
  });
  dogBreeds.length < 1
    ? dbhelper.getDogBreeds()
    : console.log("Dog breeds have already loaded.");
  catBreeds.length < 1
    ? dbhelper.getCatBreeds()
    : console.log("Cat breeds have already loaded.");
}

populateBreedsTable();

// function to insert a sample pet into the database
async function populatePetsTable() {
  const petlist = await dbhelper.Pet.findAll();
  petlist.length < 1
    ? dbhelper.createSamplePet()
    : console.log("A sample pet has already been added to the database.");
}

populatePetsTable();

// function to alphabetize breed lists by name before sending to client
function alphabetizeByName(a, b) {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  }
  return 0;
}

// endpoint to retrieve pet by id
APP.get("/pet", async (req, res) => {
  try {
    const pets = await dbhelper.Pet.findAll({
      where: {
        id: req.query.id,
      },
    });
    if (pets.length > 0) {
      res.send(pets[0]);
    } else {
      throw error;
    }
  } catch (e) {
    res.status(404).send(e);
  }
});

// endpoint to retrieve all pets
APP.get("/allpets", async (req, res) => {
  const petlist = await dbhelper.Pet.findAll();
  res.send(petlist);
});

// endpoint to retrieve all checked in pets
APP.get("/checkedinpets", async (req, res) => {
  const petlist = await dbhelper.Pet.findAll({
    where: {
      checkedin: true,
    },
  });
  res.send(petlist);
});

// endpoint to retrieve dog breeds
APP.get("/dogbreeds", async (req, res) => {
  const dogBreeds = await dbhelper.Breed.findAll({
    where: {
      species: "dog",
    },
  });
  dogBreeds.sort(alphabetizeByName);
  res.send(dogBreeds);
});

// endpoint to retrieve cat breeds
APP.get("/catbreeds", async (req, res) => {
  const catBreeds = await dbhelper.Breed.findAll({
    where: {
      species: "cat",
    },
  });
  catBreeds.sort(alphabetizeByName);
  res.send(catBreeds);
});

// endpoint to create a new pet
APP.post("/pet", async (req, res) => {
  await dbhelper.db.sync();
  const newpet = await dbhelper.Pet.create({
    petname: req.body.petname,
    checkedin: false,
    staytype: null,
    species: req.body.species,
    breed: req.body.breed,
    sex: req.body.sex,
    altered: req.body.altered,
    birthday: req.body.birthday,
    weight: req.body.weight,
    physicaldesc: req.body.physicaldesc,
    ownerid: req.body.ownerid,
  });
  console.log(newpet.toJSON());
  res.send(newpet);
});

// endpoint to edit pet by id
APP.put("/pet", async (req, res) => {
  await dbhelper.Pet.update(
    {
      sex: req.body.sex,
      altered: req.body.altered,
      breed: req.body.breed,
      weight: req.body.weight,
      physicaldesc: req.body.physicaldesc,
    },
    { where: { id: req.body.id } }
  );
  const editedPets = await dbhelper.Pet.findAll({
    where: { id: req.body.id },
  });
  res.status(200).send(editedPets[0]);
});

// endpoint to check pet in and out by id
APP.put("/checkin", async (req, res) => {
  await dbhelper.Pet.update(
    { checkedin: req.body.checkedin },
    {
      where: { id: req.body.id },
    }
  );
  const editedPets = await dbhelper.Pet.findAll({
    where: {
      id: req.body.id,
    },
  });
  res.status(200).send(editedPets[0].checkedin);
});

// development mode requires a cert in the cert directory in order to use https
if (APP_ENV == "development") {
  const key = fs.readFileSync(`${__dirname}/certs/key.pem`, "utf8");
  const cert = fs.readFileSync(`${__dirname}/certs/cert.pem`, "utf8", "utf-8");
  https.createServer({ key, cert }, APP).listen(PORT);
} else {
  APP.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
  });
}
