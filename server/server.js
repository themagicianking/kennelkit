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

// endpoint to retrieve pet data
APP.get("/pet", async (req, res) => {
  const pet = await Pet.findAll({
    where: {
      id: req.query.id,
    },
  });
  res.send(pet[0]);
});

// endpoint to check pet in and out
APP.put("/pet", async (req, res) => {
  await Pet.update(
    { checkedin: req.checkedin },
    {
      where: { id: req.id },
    }
  );

  res.send("Pet check in status has been updated.");
});

APP.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
