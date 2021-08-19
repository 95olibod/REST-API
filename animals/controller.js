const { Request, Response, NextFunction } = require('express');

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
    res.json(animals);
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
    res.status(404).json(`A animal with id ${id} was not found.`);
    } else {
    res.status(200).json(animal);
    }
}

/**
 * POST
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
 * PUT
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
function updateAnimal(req, res, next) {
    const { id, name, animalType, otherInfo } = req.params;
    const animalIndex = animals.findIndex(animal => animal.id == id);
    const animal = animals.find(animal => animal.id == id);
    if(animal){
        const clone = [ ...animals];
        clone[animalIndex] = { ...req.body, id: parseInt(id)};
        animals = clone;
        const animal = animals.find(animal => animal.id == id);
        res.status(200).json(animal);
    } else {   
        res.status(404).json(`A animal with id ${id} was not found.`);
    }
}

/**
 * DELETE
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
 function deleteAnimal(req, res, next) {
    const { id } = req.params;
    const animal = animals.find(animal => animal.id == id);
    if (!animal) {
    res.status(404).json(`A animal with id ${id} was not found.`);
    } else {
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