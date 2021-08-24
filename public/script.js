window.addEventListener('load', main);

function main() {
    // requestAnimals();
    requestSearch();

}

function requestSearch() {
    const searchButton = document.querySelector('#search-btn');
    searchButton.addEventListener('click', fetchOneAnimal);
}

function fetchOneAnimal(event) {
    let animal = prompt("Djurets ID-nummer");
    fetch('api/animals/' + animal.id, {method: 'GET', body: JSON.stringify(animal)});
    document.getElementById("animal-box").innerHTML = animal;


}

// function requestAnimals() {
//     const animalButton = document.querySelector('#animals-btn');
//     animalButton.addEventListener('click', fetchAnimals);
// }

// async function fetchAnimals(event) {
//     const response = await fetch('/api/animals');
//     const result = await response.json();
//     event.target.innerHTML = result;
// }

//fetch anrop för att få hem alla animals
//fetch('api/animals/' + animal.id, {method: 'PUT', body: JSON.stringify(animal)});
//skicka HELA objektet, underlättar

//put - byter ut hela objektet, använd put inte patch