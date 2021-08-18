//adding this so i can reach express and otehr implementations
const express= require('express');
const animalsRouter = require('./router');

//Creating a server app
const app = express();

//Parsing the incoming JSON
app.use(express.json());

app.listen(3000, () => {
    console.log('sever is running at http://localhost:3000')
})
