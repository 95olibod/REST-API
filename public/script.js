window.addEventListener('load', main);

function main() {
    requestAnimals();
    requestSearch();
    requestAddAnimal();
    requestDeleteAnimal();
    // requestEditAnimal();
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
        // const oneAnimal = JSON.stringify(animal, null, 4);
        // console.log(oneAnimal);
        const paragraf = document.createElement('p');
        paragraf.innerHTML = "<pre>" + JSON.stringify(animal, null, 4) + "<pre>";
        // paragraf.append(JSON.stringify(oneAnimal, null, 4));
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
        const res = await fetch(`api/animals/${animalId}`);
        const animal = await res.json();
        div.innerHTML = "<pre>" + JSON.stringify(animal, null, 4) + "<pre>";
    }
    
}

function requestAddAnimal() {
    const searchButton = document.querySelector('#add-btn');
    searchButton.addEventListener('click', addOneAnimal);
}

async function addOneAnimal() {
    const animalName = document.querySelector("#addName").value;
    const animalSpecies = document.querySelector("#addSpecies").value;
    const animalOtherInfo = document.querySelector("#addOther").value;
    const res = await fetch('api/animals/', {
        method: 'POST', 
        headers: {"Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: animalName,
            animalType: animalSpecies,
            otherInfo: animalOtherInfo
        })
    });
    await fetchAnimals();
}
    
    function requestDeleteAnimal() {
            const searchButton = document.querySelector('#delete-btn');
            searchButton.addEventListener('click', deleteOneAnimal);
    }
        
    async function deleteOneAnimal() {
        const id = document.querySelector("#deleteAnimal").value;
        const res = await fetch(`api/animals/${id}`, {method: 'DELETE'});
        const data = await res.json();
        // await fetchAnimals();
    }

// function requestEditAnimal() {
//     const searchButton = document.querySelector('#delete-btn');
//     searchButton.addEventListener('click', editOneAnimal);
// }

// async function editOneAnimal() {
    // headers: "Content-Type: application/json",
// }



//fetch anrop för att få hem alla animals
//skicka HELA objektet, underlättar

//put - byter ut hela objektet, använd put inte patch