const { Request, Response, NextFunction } = require("express");
const fileSystem = require("fs");
const path = require("path");
const { v1: uuidv1 } = require("uuid");
const dbFilePath = path.resolve(__dirname, "./animalDb.json");
let jsonFileData = JSON.parse(fileSystem.readFileSync(dbFilePath));

//in memory db
let animals = jsonFileData;

/**
 * Responds with all animals from file-db
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function getAnimals(req, res, next) {
  res.json(jsonFileData);
}

/**
 * Responds with one animal from file-db
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function getOneAnimal(req, res, next) {
  const { id } = req.params;
  const animal = animals.find((animal) => animal.id == id);
  if (!animal) {
    res.status(404).json(`animal with id ${id} could not be found `);
  } else {
    res.status(200).json(animal);
  }
}

/**
 * Add animal oject to file-db and responds whith all
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function addAnimal(req, res, next) {
  const animal = { ...req.body, id: uuidv1() };
  fileSystem.readFile(dbFilePath, "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading file from disk: ${err}`);
    } else if (!req.body.name | !req.body.animalType) {
      res.status(400).json("Du måste fylla i fälten namn och art");
    } else {
      // add a new animal
      animals.push(animal);

      // write new data back to the file
      fileSystem.writeFile(
        dbFilePath,
        JSON.stringify(animals, null, 4),
        (err) => {
          if (err) {
            console.log(`Error writing to file: ${err}`);
          }
        }
      );
      res.json(jsonFileData);
    }
  });
}

/**
 * Updateing json file-db
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function updateAnimal(req, res, next) {
  const { id } = req.params;
  const animal = animals.find((animal) => animal.id == id);
  const animalIndex = animals.findIndex((animal) => animal.id == id);
  const updatedAnimal = { ...req.body, id: id };

  if (req.body.name) {
    animal.name = updatedAnimal.name;
  }
  if (req.body.animalType) {
    animal.animalType = updatedAnimal.animalType;
  }
  if (req.body.otherInfo) {
    animal.otherInfo = updatedAnimal.otherInfo;
  }

  if (updatedAnimal.id !== id) {
    res.status(404).json(`animal with id ${id} could not be found `);
  }
  else {
    const clone = [...animals];
    clone[animalIndex] = animal;
    animals = clone;
    fileSystem.writeFile(
      dbFilePath,
      JSON.stringify(animals, null, 4),
      (err) => {
        if (err) {
          console.log(`Error writing to file: ${err}`);
        }
      }
    );
    res.json(animals);
  }
}

/**
 * Deletes object from josn file-db
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function deleteAnimal(req, res, next) {
  const { id } = req.params;
  const animal = animals.find((animal) => animal.id == id);
  if (!animal) {
    res.status(404).json(`animal with id ${id} could not be found `);
  } else {
    const updatedAnimals = animals.filter((animal) => animal.id != id);
    fileSystem.writeFile(
      dbFilePath,
      JSON.stringify(updatedAnimals, null, 4),
      (err) => {
        if (err) {
          console.log(`Error writing to file: ${err}`);
        }
      }
    );
    res.status(200).json(updatedAnimals);
  }
}

//Exports methods to router
module.exports = {
  getAnimals,
  getOneAnimal,
  addAnimal,
  updateAnimal,
  deleteAnimal,
};
