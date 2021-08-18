const express = require('express');


//inmemory db
const animals = [{
    id: 0,
    name: 'Dodger',
    animalType: 'Dog',
    otherInfo: 'Bichon frisé'
}];

//create object router
const router = express.Router(); 

/**
 * Responds with all animals
 * @param {express.Request} req
 * @param {express.Response } res
 * @param {express.NextFunction } req
 */
router.get('/api/animals', (req, res, next) => {
    res.json(animals);
});

router.post('/api/animals');
router.put('/api/animals');
router.delete('/api/animals');

//export the object router
module.exports = router;


