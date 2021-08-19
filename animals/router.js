const express = require('express');

//inmemory db
let animalIdIndex = 1;
let animals = [{
    name: 'Dodger',
    animalType: 'Hund',
    otherInfo: 'Bichon frisé',
    id: 0
}];

//create object router
const router = express.Router(); 


//GET

/**
 * Responds with all animals
 * @param {express.Request} req
 * @param {express.Response } res
 * @param {express.NextFunction } req
 */
router.get('/api/animals', (req, res, next) => {
    res.json(animals);
});

//GET ONE

/**
 * Responds with all animals
 * @param {express.Request} req
 * @param {express.Response } res
 * @param {express.NextFunction } req
 */
 router.get('/api/animals/:id', (req, res, next) => {
    const { id } = req.params;
    const animal = animals.find(animal => animal.id == id);
    if (!animal) {
    res.status(404).json('animal with id ${id} was not found.');
    } else {
    res.status(200).json(animal);
    }
});
    



//POST
/**
 * Saves new animal to array animals
 * @param {express.Request} req
 * @param {express.Response } res
 * @param {express.NextFunction } req
 */
router.post('/api/animals', (req, res, next) => {
    const animal = { ...req.body, id: animalIdIndex++ } // plockar alla properties i animals med ... (Klona)
    animals.push(animal);
    res.json(animal);
});

// PUT

router.put('/api/animals/:id', (req, res, next) => {

    
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

});

//DELETE 
/**
 * delete one animal from array
 * @param {express.Request} req
 * @param {express.Response } res
 * @param {express.NextFunction } req
 */
router.delete('/api/animals/:id', (req, res, next) => {
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
});

//export the object router
module.exports = router;


