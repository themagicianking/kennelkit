import { Sequelize, DataTypes } from "sequelize";
import { DATABASE, USERNAME, PASSWORD } from "./server.js";

class databaseHelper {
  constructor(environment) {
    if (environment == "development") {
      this.DATABASE = DATABASE;
      this.USERNAME = USERNAME;
      this.PASSWORD = PASSWORD;

      this.db = new Sequelize(this.DATABASE, this.USERNAME, this.PASSWORD, {
        host: "localhost",
        dialect: "postgres",
      });
    } else {
      this.db = new Sequelize(
        "postgresql://postgres:TcsqgayINAiUgfGjBdzcfLHOVAqukiZH@postgres-4tco.railway.internal:5432/railway"
      );
    }

    this.dropAllTables();
    this.createPet();
    this.createBreed();
    this.db.sync();
  }

  dropAllTables = function () {
    this.db.query(`DROP TABLE IF EXISTS "Pets";`);
    this.db.query(`DROP TABLE IF EXISTS "Breeds";`);
  };

  // define pet table
  createPet = function () {
    this.Pet = this.db.define("Pet", {
      petname: { type: DataTypes.STRING, allowNull: false },
      checkedin: { type: DataTypes.BOOLEAN, allowNull: false },
      staytype: { type: DataTypes.STRING },
      species: { type: DataTypes.STRING, allowNull: false },
      breed: { type: DataTypes.STRING, allowNull: false },
      sex: { type: DataTypes.STRING, allowNull: false },
      altered: { type: DataTypes.STRING, allowNull: false },
      birthday: { type: DataTypes.DATE, allowNull: false },
      weight: { type: DataTypes.INTEGER },
      physicaldesc: { type: DataTypes.STRING },
      ownerid: { type: DataTypes.INTEGER, allowNull: false },
    });
  };

  // define breed table
  createBreed = function () {
    this.Breed = this.db.define("Breed", {
      species: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
    });
  };

  // getting cat breeds from the api
  getCatBreeds = function () {
    (async () => {
      await fetch("https://api.thecatapi.com/v1/breeds", {
        "Content-Type": "application/json",
      })
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          let presets = [
            { species: "cat", name: "Domestic Longhair" },
            { species: "cat", name: "Domestic Shorthair" },
          ];
          let apiCatBreeds = json.map((breed) => ({
            species: "cat",
            name: breed.name,
          }));
          let allCatBreeds = apiCatBreeds.concat(presets);
          this.Breed.bulkCreate(allCatBreeds);
        });
    })();
  };

  // getting dog breeds from the api
  getDogBreeds = function () {
    (async () => {
      await fetch("https://api.thedogapi.com/v1/breeds", {
        "Content-Type": "application/json",
      })
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          let presets = [{ species: "dog", name: "Mixed" }];
          let apiDogBreeds = json.map((breed) => ({
            species: "dog",
            name: breed.name,
          }));
          let allDogBreeds = apiDogBreeds.concat(presets);
          this.Breed.bulkCreate(allDogBreeds);
        });
    })();
  };

  // create sample pet
  createSamplePet = function () {
    (async () => {
      await this.Pet.bulkCreate([
        {
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
        },
      ]);
    })();
  };
}

export default databaseHelper;
