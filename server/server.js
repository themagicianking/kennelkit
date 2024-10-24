import express from "express";
import cors from "cors";
import "dotenv/config";
import databaseHelper from "./databasehelper.js";

const APP = express();
// const PORT = 5000;
const DATABASE = process.env.PGDATABASE;
const USERNAME = process.env.USER;
const PASSWORD = process.env.PGPASSWORD;
const PORT = process.env.PGPORT;

const dbhelper = new databaseHelper(DATABASE, USERNAME, PASSWORD);

dbhelper.createSamplePet();
dbhelper.getCatBreeds();
dbhelper.getDogBreeds();

dbhelper.db.sync();

APP.use(express.json());
APP.use(cors());

// endpoint to retrieve pet id
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
  res.send(dogBreeds);
});

// endpoint to retrieve cat breeds
APP.get("/catbreeds", async (req, res) => {
  const catBreeds = await dbhelper.Breed.findAll({
    where: {
      species: "cat",
    },
  });
  res.send(catBreeds);
});

// endpoint to create a new pet
APP.post("/pet", async (req, res) => {
  await dbhelper.db.sync();
  const newpet = await Pet.create({
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
  res.status(200).send("Pet has been edited.");
});

// endpoint to check pet in and out
APP.put("/checkin", async (req, res) => {
  await dbhelper.Pet.update(
    { checkedin: req.body.checkedin },
    {
      where: { id: req.body.id },
    }
  );
  res.status(200).send("Pet's check in status has been changed.");
});

APP.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
