import { Sequelize, DataTypes } from "sequelize";

class databaseHelper {
  constructor(database, username, password) {
    this.DATABASE = database;
    this.USERNAME = username;
    this.PASSWORD = password;

    this.db = new Sequelize(this.DATABASE, this.USERNAME, this.PASSWORD, {
      host: "localhost",
      dialect: "postgres",
    });

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

    this.Breed = this.db.define("Breed", {
      species: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
    });
  }

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
          function alphabetize(a, b) {
            if (a.name < b.name) {
              return -1;
            } else if (a.name > b.name) {
              return 1;
            }
            return 0;
          }
          let presets = [
            { id: "Domestic Longhair", name: "Domestic Longhair" },
            { id: "Domestic Shorthair", name: "Domestic Shorthair" },
          ];
          let allCatBreeds = json.concat(presets).sort(alphabetize);
          allCatBreeds.forEach((breed) => {
            this.Breed.create({ species: "cat", name: breed.name });
          });
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
          function alphabetize(a, b) {
            if (a.name < b.name) {
              return -1;
            } else if (a.name > b.name) {
              return 1;
            }
            return 0;
          }
          let presets = [{ id: "Mixed", name: "Mixed" }];
          let allDogBreeds = json.concat(presets).sort(alphabetize);
          allDogBreeds.forEach((breed) => {
            this.Breed.create({ species: "dog", name: breed.name });
          });
        });
    })();
  };

  // create sample pet
  createSamplePet = function () {
    (async () => {
      await this.db.sync();
      const arcadia = await this.Pet.create({
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
  };
}

export default databaseHelper;
