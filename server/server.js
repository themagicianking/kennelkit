import express from "express";
import cors from "cors";
import "dotenv/config";
import { Sequelize } from "sequelize";

const APP = express();
const PORT = 5000;
const DATABASE = process.env.database;
const USERNAME = process.env.username;
const PASSWORD = process.env.password;

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: "localhost",
  dialect: "postgres",
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

APP.use(express.json());
APP.use(cors());

APP.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
