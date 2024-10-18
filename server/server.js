import express from "express";
import cors from "cors";
import "dotenv/config";
import { Sequelize, DataTypes } from "sequelize";

const APP = express();
const PORT = 5000;
const DATABASE = process.env.database;
const USERNAME = process.env.username;
const PASSWORD = process.env.password;

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: "localhost",
  dialect: "postgres",
});

const Pet = sequelize.define("Pet", {
  petname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  checkedin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  staytype: {
    type: DataTypes.STRING,
  },
  species: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  breed: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sex: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  altered: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  weight: {
    type: DataTypes.INTEGER,
  },
  physicaldesc: {
    type: DataTypes.STRING,
  },
  ownerid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

(async () => {
  await sequelize.sync({ force: true });
  const arcadia = await Pet.create({
    petname: "Arcadia",
    checkedin: true,
    staytype: "daycare",
    species: "cat",
    breed: "Domestic Shorthair",
    sex: "female",
    altered: true,
    birthday: "2023-07-13",
    weight: 10,
    physicaldesc: "Shorthaired tuxedo",
    ownerid: 0,
  });
  console.log(arcadia.toJSON());
})();

APP.use(express.json());
APP.use(cors());

// endpoint to retrieve pet id
APP.get("/pet", async (req, res) => {
  const pet = await Pet.findAll({
    where: {
      id: req.query.id,
    },
  });
  res.send(pet[0]);
});

// endpoint to retrieve all pets
APP.get("/allpets", async (req, res) => {
  const petlist = await Pet.findAll();
  res.send(petlist);
});

// endpoint to retrieve all checked in pets
APP.get("/checkedinpets", async (req, res) => {
  const petlist = await Pet.findAll({
    where: {
      checkedin: true,
    },
  });
  res.send(petlist);
});

// endpoint to create a new pet
APP.post("/pet", async (req, res) => {
  await sequelize.sync({ force: true });
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

// endpoint to check pet in and out
APP.put("/checkin", async (req, res) => {
  await Pet.update(
    { checkedin: req.body.checkedin },
    {
      where: { id: req.body.id },
    }
  );
  res.status(200);
});

APP.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
