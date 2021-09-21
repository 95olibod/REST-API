window.addEventListener("load", main);

function main() {
  requestAnimals();
  requestSearch();
  requestAddAnimal();
  requestDeleteAnimal();
  requestEditAnimal();
}

// Eventlistner for GET- button
function requestAnimals() {
  const animalButton = document.querySelector("#animals-btn");
  animalButton.addEventListener("click", fetchAnimals);
}

// fetch and shows output from animalDb.json
async function fetchAnimals(event) {
  const div = document.querySelector("#animal-box");
  div.innerHTML = "";
  const res = await fetch("/api/animals");
  const animals = await res.json();

  for (const animal of animals) {
    const paragraf = document.createElement("p");
    paragraf.innerHTML = "<pre>" + JSON.stringify(animal, null, 4) + "<pre>";
    div.append(paragraf);
  }
}

// Eventlistner for GET + id- button
function requestSearch() {
  const searchButton = document.querySelector("#search-btn");
  searchButton.addEventListener("click", fetchOneAnimal);
}

// fetch one object from animalDb.json

async function fetchOneAnimal() {
  const div = document.querySelector("#animal-box");
  div.innerHTML = "";
  const animalId = document.getElementById("getOneAnimalFromId").value;

  if (!animalId) {
    window.alert("Du måste fylla i ett id nummer");
  } else {
    const res = await fetch(`api/animals/${animalId}`);
    const animal = await res.json();
    div.innerHTML = "<pre>" + JSON.stringify(animal, null, 4) + "<pre>";
  }
  document.getElementById("getOneAnimalFromId").value = "";
}

// Eventlistner for Post- button
function requestAddAnimal() {
  const searchButton = document.querySelector("#add-btn");
  searchButton.addEventListener("click", addOneAnimal);
}

// Posts new object in to animalDb.json and GET request
async function addOneAnimal() {
  const animalName = document.querySelector("#addName").value;
  const animalSpecies = document.querySelector("#addSpecies").value;
  const animalOtherInfo = document.querySelector("#addOther").value;
  console.log(animalName);

  if (!animalName | !animalSpecies) {
    alert("Du måste fylla i fälten: Namn och Art för att lägga in ett djur");
  } else {
    await fetch("api/animals/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: animalName,
        animalType: animalSpecies,
        otherInfo: animalOtherInfo
      }),
    });
    document.querySelector("#addName").value = "";
    document.querySelector("#addSpecies").value = "";
    document.querySelector("#addOther").value = "";
    alert('Djuret har nu lagts till');
  }
}

// Eventlistner for DELETE- button
function requestDeleteAnimal() {
  const searchButton = document.querySelector("#delete-btn");
  searchButton.addEventListener("click", deleteOneAnimal);
}

// delete animal by id and a GET request
async function deleteOneAnimal() {
  const animalId = document.querySelector("#deleteAnimal").value;
  const res = await fetch(`api/animals/${animalId}`);
  if (!animalId) {
    alert("Du måste fylla i ett id nummer");
  } else if (res.statusText !== "OK") {
    alert("Ett djur med detta ID existerar inte.");
  } else {
    await fetch(`api/animals/${animalId}`, { method: "DELETE" });
    alert(
      `Ett djur med ID: ` + "\n" + `${animalId}` + "\n" + `är nu borttaget`
    );
  }
  document.querySelector("#deleteAnimal").value = "";
}

// Eventlistner for PUT- button
function requestEditAnimal() {
  const searchButton = document.querySelector("#edit-btn");
  searchButton.addEventListener("click", editOneAnimal);
}

//fetch one json object by id and PUT request 
async function editOneAnimal() {
  const animalId = document.querySelector("#editWithId").value;
  const res = await fetch(`api/animals/${animalId}`);
  const animal = res.json();
  console.log(animal);
  const animalName = document.querySelector("#addNewName").value;
  const animalSpecies = document.querySelector("#addNewSpecies").value;
  const animalOtherInfo = document.querySelector("#addNewOther").value;

  if (res.statusText !== "OK" | animalId == " ") {
    alert("Ett djur med detta ID existerar inte.");
  } else {
    const response = await fetch(`api/animals/${animalId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: animalName,
        animalType: animalSpecies,
        otherInfo: animalOtherInfo,
      }),
    });
    alert(
      `Djuret med ID: ` + "\n" + `${animalId}` + "\n" + `har nu redigerats`
    );
    await fetchOneAnimalById(animalId);
    document.querySelector("#editWithId").value = "";
    document.querySelector("#addNewName").value = "";
    document.querySelector("#addNewSpecies").value = "";
    document.querySelector("#addNewOther").value = "";
  }
}

//fetch one json object by chosen id
async function fetchOneAnimalById(id) {
  const div = document.querySelector("#animal-box");
  div.innerHTML = "";
  const res = await fetch(`api/animals/${id}`);
  const animal = await res.json();
  div.innerHTML = "<pre>" + JSON.stringify(animal, null, 4) + "<pre>";
}
