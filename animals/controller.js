const { Request, Response, NextFunction } = require('express');
const fileSystem = require('fs');
const path = require('path');
const dbFilePath = path.resolve(__dirname, './animalDb.json');


//in memory db
let animalIdIndex = 1;
let animals = [{
    name: 'Dodger',
    animalType: 'Hund',
    otherInfo: 'Bichon frisé',
    id: 0
}];

/**
 * Responds with all animals from in memory db
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
function getAnimals(req, res, next) {
    let jsonFileData = JSON.parse(fileSystem.readFileSync(dbFilePath));
    res.json(jsonFileData);  
}

/**
 * Responds with one animal from in memory db 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
function getOneAnimal(req, res, next) {
    const { id } = req.params;
    const animal = animals.find(animal => animal.id == id);
    if (!animal) {
    res.status(404).json('animal with id ${id} was not found.');
    } else {
    res.status(200).json(animal);
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
function saveAnimal(req, res, next) {
    const animal = { ...req.body, id: animalIdIndex++ } // plockar alla properties i animals med ... (Klona)
    animals.push(animal);
    res.json(animal);
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
function updateAnimal(req, res, next) {
    const { id, name, animalType, otherInfo } = req.params;
    const animalIndex = animals.findIndex(animal => animal.id == id);
    if(animalIndex){
        const clone = [ ...animals];
        clone[animalIndex] = { ...req.body, id: parseInt(id)};
        animals = clone;
        const animal = animals.find(animal => animal.id == id);
        res.status(200).json(animal);
    } else {   
        res.status(404).json('animal with that id could not be found');
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
 function deleteAnimal(req, res, next) {
    const { id } = req.params;
    const animalIndex = animals.findIndex(animal => animal.id == id);
    if (!req.params.id) {
    res.status(404).json('animal with id ${id} was not found.');
    } else {
        // animals.splice(animalIdIndex, 1);
        const updatedAnimals = animals.filter((animal) => animal.id != id);
        animals = updatedAnimals; 
    res.status(200).json(animals);
    }
 }


module.exports = {
    getAnimals,
    getOneAnimal,
    saveAnimal,
    updateAnimal,
    deleteAnimal
}