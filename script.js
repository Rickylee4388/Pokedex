let currentPokemon;
let Pokemon = "bulbasaur";
let pokeball = "img/pokeball.png";
let amountOfPokemon = 152;
let favorites =['0'];

async function loadAllPokemon() {
  document.getElementById("pokemonList").innerHTML = '';
  for (let i = 1; i < amountOfPokemon; i++) {
    let number = i;
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    let name = currentPokemon["forms"][0]["name"];
    let pokImg = currentPokemon["sprites"]["other"]["dream_world"]["front_default"];
    let pokType = currentPokemon["types"]["0"]["type"]["name"];
    pokemonList(number, pokType, i, name, pokImg);
    addNumberSmall(number);
  }
}


function pokemonList(number, pokType, i, name, pokImg) {
  document.getElementById("pokemonList").innerHTML += generatePokemonListHtml(number, pokType, i, name, pokImg);
}


async function openPokeCard(i) {
  let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
  let response = await fetch(url);
  currentPokemon = await response.json();
  currentPokemonInfo();
  document.getElementById("pokeCardOpacity").classList.remove("d-none");
  document.getElementById("arrowCardDiv").classList.remove("d-none");
  let favNumber = document.getElementById('number').innerText;
  checkLocalStorage();
  generateHeartColour(favNumber);
  

}

function checkLocalStorage(){
  if (localStorage.getItem("favoriteNumber") === null) {
    favorites =['0'];
  }
  else{
    favorites = JSON.parse(localStorage.getItem('favoriteNumber'));
  }
}

function   generateHeartColour(favNumber){  
  if(favorites.includes(favNumber)){
  let red = "./img/heart-red.svg";
  let heart = document.getElementById('heartsvg');
  heart.src = red;
}
else{
  let white = "./img/heart.svg";
  let heart = document.getElementById('heartsvg');
  heart.src = white;
}
}


function toggleHeart(){
  let heart = document.getElementById('heartsvg');
  let scource = heart.src;
  let red = "./img/heart-red.svg";
  let white = "./img/heart.svg";
  let currentNumber = document.getElementById('number').innerText;
  let favNumber = document.getElementById('number').innerText;

  if (favorites.includes(currentNumber)){
    let index = favorites.indexOf(favNumber);
    favorites.splice(index, 1);
    heart.src = white;
    saveToLocalStorage(favorites);
  }
  else{
    favorites.push(favNumber);
    heart.src = red;
    saveToLocalStorage(favorites);
  }
}


function saveToLocalStorage(favorites){
  localStorage.setItem('favoriteNumber', JSON.stringify(favorites));
  favorites = JSON.parse(localStorage.getItem('favoriteNumber'));

}


function previousCard(){
  let number = currentPokemon["id"];
  if (number>=2){
    number--;
    openPokeCard(number);
  }
  else{
    number = 151;
    openPokeCard(number);
  }

}


function nextCard(){
  let number = currentPokemon["id"];
  if (number<=150){
    number++;
    openPokeCard(number);
  }
  else{
    number = 1;
    openPokeCard(number);
  }

}


function closePokeCard() {
  document.getElementById("arrowCardDiv").classList.add("d-none");
  document.getElementById("pokeCardOpacity").classList.add("d-none");
}


function currentPokemonInfo() {
  let pokImg = currentPokemon["sprites"]["other"]["home"]["front_default"];
  let pokemonName = currentPokemon["name"];
  let name = currentPokemon["forms"][0]["name"];
  let pokType = currentPokemon["types"]["0"]["type"]["name"];
  let number = currentPokemon["id"];
  generateCardBG(pokType);
  generatePokeCardInformation(pokemonName, pokType, pokImg);
  addNumber(number);
  console.log("Pokemon is", name);
  generateAboutTable(currentPokemon);
}


function generatePokeCardInformation(pokemonName, pokType, pokImg) {
  document.getElementById("pokemonName").innerHTML = capitalizeFirstLetter(pokemonName);
  document.getElementById("pokeCardType").innerHTML = `${pokType}`;
  document.getElementById("pokemonImage").src = pokImg;
}


function generateCardBG(pokType) {
  document.getElementById("pokeCard").className = "";
  document.getElementById("pokeCard").classList.add("pokeCard", `${pokType}`);
  document.getElementById("pokeCardType").className = "";
  document.getElementById("pokeCardType").classList.add("pokeCardType", `${pokType}-light`);
}


function addNumber(number) {
  if (number >= 10 && number <= 99) {
    return (document.getElementById("number").innerHTML = `#0${number}`);
  }
  if (number >= 100) {
    return (document.getElementById("number").innerHTML = `#${number}`);
  } else {
    return (document.getElementById("number").innerHTML = `#00${number}`);
  }
}


function addNumberSmall(number) {
  if (number >= 10 && number <= 99) {
    return (document.getElementById(`${number}small`).innerHTML = `#0${number}`);
  }
  if (number >= 100) {
    return (document.getElementById(`${number}small`).innerHTML = `#${number}`);
  } else {
    return (document.getElementById(`${number}small`).innerHTML = `#00${number}`);
  }
}


function generateAboutTable(currentPokemon) {
  let pokType = currentPokemon["types"]["0"]["type"]["name"];
  let height = currentPokemon["height"];
  let weight = currentPokemon["weight"];
  let pokemonabilities = currentPokemon["abilities"][0]["ability"]["name"];
  document.getElementById("aboutTable").innerHTML = ``;
  document.getElementById("aboutTable").classList.remove("moves");
  document.getElementById("aboutTable").innerHTML += generateAboutTableHtml(pokType,height,weight,pokemonabilities);
}


function generateBaseStats(currentPokemon) {
  let hp = currentPokemon["stats"]["0"]["base_stat"];
  let attack = currentPokemon["stats"]["1"]["base_stat"];
  let defense = currentPokemon["stats"]["2"]["base_stat"];
  let specialAttack = currentPokemon["stats"]["3"]["base_stat"];
  document.getElementById("aboutTable").innerHTML = ``;
  document.getElementById("aboutTable").classList.remove("moves");
  document.getElementById("aboutTable").innerHTML += generateBaseStatsHtml(hp,attack,defense,specialAttack);
}


function generateMoves(currentPokemon) {
  let move1 = currentPokemon["moves"]["0"]["move"]["name"];
  let move2 = currentPokemon["moves"]["1"]["move"]["name"];
  let move3 = currentPokemon["moves"]["2"]["move"]["name"];
  let move4 = currentPokemon["moves"]["3"]["move"]["name"];
  document.getElementById("aboutTable").innerHTML = ``;
  document.getElementById("aboutTable").classList.add("moves");
  document.getElementById("aboutTable").innerHTML = generateMovesHtml(move1,move2,move3,move4);
}

function capitalizeFirstLetter(pokemonName) {
  return pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
}


async function searchPokemon(){
  Pokemon = document.getElementById("inputPokemon").value;
  Pokemon = minimizeFirstLetter(Pokemon);
  document.getElementById("inputPokemon").value="";
      let url = `https://pokeapi.co/api/v2/pokemon/${Pokemon}`;
      let response = await fetch(url);

      if (response['status'] == '404'){
        document.getElementById("errormessage").classList.remove("d-none");
        setTimeout(function () {
          document.getElementById("errormessage").classList.add("d-none");
      }, 2000);
        
      }
      else{
      currentPokemon = await response.json();
      let number = currentPokemon["id"];
      openPokeCard(number);
    }
}


function minimizeFirstLetter(Pokemon) {
  return Pokemon.charAt(0).toLowerCase() + Pokemon.slice(1);
}


async function filterPokemon(j){
  let type = j;
  document.getElementById("pokemonList").innerHTML="";
  if (type === "all"){
    loadAllPokemon();
  }
  else{
    for (let i = 1; i < amountOfPokemon; i++) {
    let number = i;
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    let name = currentPokemon["forms"][0]["name"];
    let pokImg = currentPokemon["sprites"]["other"]["dream_world"]["front_default"];
    let pokType = currentPokemon["types"]["0"]["type"]["name"];

    if (type === pokType){
    pokemonList(number, pokType, i, name, pokImg);
    addNumberSmall(number);}
  }}
  
}


function loadMorePokemon(){
  amountOfPokemon = amountOfPokemon + 20;
  loadAllPokemon(amountOfPokemon);
}






// HTML TEMPLATE

function generatePokemonListHtml(number, pokType, i, name, pokImg){
  return /*html*/ `
  <div id="#00${number}" class="pokemonID ${pokType} " onclick='openPokeCard(${i})'>
    <b>${capitalizeFirstLetter(name)}</b>
    <div class="d-flex mt20">        
      <div>
        <div id="type" class="type ${pokType}-light">${pokType} 
        </div>
        <div id="${number}small" class="numbersmall"></div>
      </div>
      <img class="pokeimg" src="${pokImg}" alt="">
    </div>
  </div>
`
}


function generateAboutTableHtml(pokType,height,weight,pokemonabilities){
  return /*html*/ `
  <tr>
      <td class="tdAbout1">Type</td>
      <td class="tdAbout2" id="species">${pokType}</td>
  </tr>
  <tr>
      <td class="tdAbout1">Height</td>
      <td class="tdAbout2" id="height">${height} ft</td>
  </tr>
  <tr>
      <td class="tdAbout1">Weight</td>
      <td class="tdAbout2" id="weight">${weight} lb</td>
  </tr>
  <tr>
      <td class="tdAbout1">Abilities</td>
      <td class="tdAbout2" id="abilities">
          ${pokemonabilities}<br>
          
      </td>
  </tr>
`;
}


function generateBaseStatsHtml(hp,attack,defense,specialAttack){
  return /*html*/ `
  <tr>
      <td class="tdAbout1">Hp</td>
      <td class="tdAbout2" id="species">${hp}</td>
  </tr>
  <tr>
      <td class="tdAbout1">Attack</td>
      <td class="tdAbout2" id="height">${attack} </td>
  </tr>
  <tr>
      <td class="tdAbout1">Defense</td>
      <td class="tdAbout2" id="weight">${defense} </td>
  </tr>
  <tr>
      <td class="tdAbout1">Special attack</td>
      <td class="tdAbout2" id="abilities">${specialAttack}<br></td>
  </tr>
  `;
}


function generateMovesHtml(move1,move2,move3,move4){
  return /*html*/ `
<div class="tableDiv">${capitalizeFirstLetter(move1)}</div>
<div class="tableDiv">${capitalizeFirstLetter(move2)}</div>
<div class="tableDiv">${capitalizeFirstLetter(move3)}</div>
<div class="tableDiv">${capitalizeFirstLetter(move4)}</div>
`;
}