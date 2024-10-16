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
});

(async () => {
  await sequelize.sync({ force: true });
  const arcadia = await Pet.create({ petname: "Arcadia", checkedin: true });
  console.log(arcadia.toJSON());
})();

APP.use(express.json());
APP.use(cors());

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
