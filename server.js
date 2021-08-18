//adding this so i can reach express and otehr implementations
const express= require('express');
const animalsRouter = require('./animals/router');

//Creating a server app
const app = express();

//Parsing the incoming JSON
app.use(express.json());

//Adding resources
app.use(animalsRouter);

// Start the server
app.listen(3000, () => {
    console.log('sever is running at http://localhost:3000')
}) 
