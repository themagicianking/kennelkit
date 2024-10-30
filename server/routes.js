// importing custom sequelize class
import databaseHelper from "./databasehelper.js";

// environment variables
const DATABASE_URL = process.env.DATABASE_URL;

// creates a sequelize instance
const dbhelper = new databaseHelper(DATABASE_URL);

// function to alphabetize breed lists by name before sending to client
function alphabetizeByName(a, b) {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  }
  return 0;
}

export const POPULATE = {
  // insert a sample owner into the database
  ownersTable: async () => {
    const ownerlist = await dbhelper.Owner.findAll();
    ownerlist.length < 1
      ? dbhelper.createSampleOwner()
      : console.log("A sample owner has already been created.");
  },

  // pull cat & dog breeds from api, add them to preset list of breeds, and insert them into breeds table
  breedsTable: async () => {
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
  },

  // insert a sample pet into the database
  petsTable: async () => {
    const petlist = await dbhelper.Pet.findAll();
    petlist.length < 1
      ? dbhelper.createSamplePet()
      : console.log("A sample pet has already been added to the database.");
  },
};

export const GET = {
  allOwners: async (req, res) => {
    try {
      const owners = await dbhelper.Owner.findAll();
      res.send(owners);
    } catch (e) {
      res.status(404).send(e);
    }
  },

  ownerById: async (req, res) => {
    try {
      const owner = await dbhelper.Owner.findOne({
        where: { id: req.query.id },
      });
      if (owner !== null) {
        res.send(owner);
      } else {
        throw new Error("Could not get owner.");
      }
    } catch (e) {
      res.status(404).send(e);
    }
  },

  catBreeds: async (req, res) => {
    const catBreeds = await dbhelper.Breed.findAll({
      where: {
        species: "cat",
      },
    });
    catBreeds.sort(alphabetizeByName);
    res.send(catBreeds);
  },

  dogBreeds: async (req, res) => {
    const dogBreeds = await dbhelper.Breed.findAll({
      where: {
        species: "dog",
      },
    });
    dogBreeds.sort(alphabetizeByName);
    res.send(dogBreeds);
  },

  allPets: async (req, res) => {
    const petlist = await dbhelper.Pet.findAll();
    res.send(petlist);
  },

  allCheckedInPets: async (req, res) => {
    const petlist = await dbhelper.Pet.findAll({
      where: {
        checkedin: true,
      },
    });
    res.send(petlist);
  },

  petById: async (req, res) => {
    try {
      const pet = await dbhelper.Pet.findOne({ where: { id: req.query.id } });
      if (pet !== null) {
        res.send(pet);
      } else {
        throw new Error("Could not get pet.");
      }
    } catch (e) {
      res.status(404).send(e);
    }
  },

  petsByOwner: async (req, res) => {
    const petlist = await dbhelper.Pet.findAll({
      where: {
        ownerid: req.query.id,
      },
    });
    res.send(petlist);
  },
};

export const POST = {
  owner: async (req, res) => {
    await dbhelper.db.sync();
    const newOwner = await dbhelper.Owner.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phone: req.body.phone,
      email: req.body.email,
    });

    console.log(newOwner.toJSON());
    res.send(newOwner);
  },

  pet: async (req, res) => {
    await dbhelper.db.sync();
    const newPet = await dbhelper.Pet.create({
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

    console.log(newPet.toJSON());
    res.send(newPet);
  },
};

export const PUT = {
  owner: async (req, res) => {
    await dbhelper.Owner.update(
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
      },
      { where: { id: req.body.id } }
    );
    const editedOwners = await dbhelper.Owner.findAll({
      where: {
        id: req.body.id,
      },
    });
    res.status(200).send(editedOwners[0]);
  },

  pet: async (req, res) => {
    await dbhelper.Pet.update(
      {
        sex: req.body.sex,
        altered: req.body.altered,
        species: req.body.species,
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
  },

  checkin: async (req, res) => {
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
  },
};
