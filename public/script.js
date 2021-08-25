window.addEventListener('load', main);

function main() {
    requestAnimals();
    requestSearch();
    requestAddAnimal();
    requestDeleteAnimal();
    requestEditAnimal();
}

function requestAnimals() {
    const animalButton = document.querySelector('#animals-btn');
    animalButton.addEventListener('click', fetchAnimals);
}


async function fetchAnimals(event) {
    const div = document.querySelector('#animal-box');
    div.innerHTML = "";
    const res = await fetch('/api/animals');
    const animals = await res.json();

    for(const animal of animals) {
        const oneAnimal = JSON.stringify(animal, null, 4);
        console.log(oneAnimal);
        const paragraf = document.createElement('p');
        paragraf.append(oneAnimal);
        div.append(paragraf);
    }
}

function requestSearch() {
    const searchButton = document.querySelector('#search-btn');
    searchButton.addEventListener('click', fetchOneAnimal);
}

async function fetchOneAnimal(event) {
    const div = document.querySelector('#animal-box');
    div.innerHTML = "";
    const animalId = document.getElementById("getOneAnimalFromId").value;
    if(!animalId){
        window.alert('Du måste fylla i ett id nummer')
    } else {   
        const res = await fetch('api/animals/' + animalId);
        const animal = await res.json();
        const oneAnimal = JSON.stringify(animal, null, 4);
        const paragraf = document.createElement('p');
        paragraf.append(oneAnimal);
        div.append(paragraf);
    }
    
}

function requestAddAnimal() {
    const searchButton = document.querySelector('#add-btn');
    searchButton.addEventListener('click', AddOneAnimal);
}

async function addOneAnimal() {

}

function requestDeleteAnimal() {
    const searchButton = document.querySelector('#delete-btn');
    searchButton.addEventListener('click', deleteOneAnimal);
}

async function deleteOneAnimal() {

}

function requestEditAnimal() {
    const searchButton = document.querySelector('#delete-btn');
    searchButton.addEventListener('click', editOneAnimal);
}

async function editOneAnimal() {

}



//fetch anrop för att få hem alla animals
//fetch('api/animals/' + animal.id, {method: 'PUT', body: JSON.stringify(animal)});
//skicka HELA objektet, underlättar

//put - byter ut hela objektet, använd put inte patch