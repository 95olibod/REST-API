const express = require('express');
const { getAnimals, getOneAnimal, saveAnimal, updateAnimal, deleteAnimal } = require('./controller');



//create object router
const router = express.Router(); 


//GET
router.get('/api/animals', getAnimals);

//GET ONE
 router.get('/api/animals/:id', getOneAnimal);
    
//POST
router.post('/api/animals', saveAnimal);

// PUT

router.put('/api/animals/:id', updateAnimal);

//DELETE 

router.delete('/api/animals/:id', deleteAnimal);

//export the object router
module.exports = router;


