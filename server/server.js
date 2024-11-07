// importing needed modules
import express from "express";
import cors from "cors";
import "dotenv/config";
import https from "https";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { POPULATE, GET, POST, PUT } from "./routes.js";

// create express app
const APP = express();
APP.use(express.json());
APP.use(cors());

// get directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// environment variables
const APP_ENV = process.env.APP_ENV;
const PORT = process.env.PORT;

// insert sample data into the database along with needed breed data
POPULATE.ownersTable();
POPULATE.breedsTable();
POPULATE.petsTable();

// calling app routes
APP.get("/allowners", GET.allOwners);
APP.get("/ownerbyid", GET.ownerById);
APP.get("/catbreeds", GET.catBreeds);
APP.get("/dogbreeds", GET.dogBreeds);
APP.get("/allpets", GET.allPets);
APP.get("/checkedinpets", GET.allCheckedInPets);
APP.get("/petbyid", GET.petById);
APP.get("/petsbyowner", GET.petsByOwner);

APP.post("/owner", POST.owner);
APP.post("/pet", POST.pet);

APP.put("/owner", PUT.owner);
APP.put("/pet", PUT.pet);
APP.put("/checkin", PUT.checkin);

// development mode requires a cert in the cert directory in order to use https
if (APP_ENV == "development") {
  const key = fs.readFileSync(`${__dirname}/certs/key.pem`, "utf8");
  const cert = fs.readFileSync(`${__dirname}/certs/cert.pem`, "utf8", "utf-8");
  https.createServer({ key, cert }, APP).listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
} else {
  APP.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
  });
}
