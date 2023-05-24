let currentPokemon;
let Pokemon = "bulbasaur";
let pokeball = "img/pokeball.png";

async function loadAllPokemon() {
  for (let i = 1; i < 152; i++) {
    let number = i;
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    let name = currentPokemon["forms"][0]["name"];
    let pokImg = currentPokemon["sprites"]["other"]["dream_world"]["front_default"];
    let pokType = currentPokemon["types"]["0"]["type"]["name"];
    pokemonList(number, pokType, i, name, pokImg);
  }
}
function pokemonList(number, pokType, i, name, pokImg) {
  return (document.getElementById("pokemonList").innerHTML += /*html*/ `
  <div id="#00${number}" class="pokemonID ${pokType} " onclick='openPokeCard(${i})'>
    <b>${capitalizeFirstLetter(name)}</b>
    <div class="d-flex mt20">        
      <div>
        <div id="type" class="type ${pokType}-light">${pokType} 
        </div>
      </div>
      <img class="pokeimg" src="${pokImg}" alt="">
    </div>
  </div>
`);
}
async function openPokeCard(i) {
  let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
  let response = await fetch(url);
  currentPokemon = await response.json();
  currentPokemonInfo();
  document.getElementById("pokeCard").classList.remove("d-none");
  document.getElementById("switchCard").classList.remove("d-none");
  document.getElementById("pokeCardOpacity").classList.remove("d-none");
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
  document.getElementById("pokeCard").classList.add("d-none");
  document.getElementById("switchCard").classList.add("d-none");
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
  document.getElementById("pokemonName").innerHTML =
    capitalizeFirstLetter(pokemonName);
  document.getElementById("pokeCardType").innerHTML = `${pokType}`;
  document.getElementById("pokemonImage").src = pokImg;
}
function generateCardBG(pokType) {
  document.getElementById("pokeCard").className = "";
  document.getElementById("pokeCard").classList.add("pokeCard", `${pokType}`);
  document.getElementById("pokeCardType").className = "";
  document
    .getElementById("pokeCardType")
    .classList.add("pokeCardType", `${pokType}-light`);
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
function generateAboutTable(currentPokemon) {
  let pokType = currentPokemon["types"]["0"]["type"]["name"];
  let height = currentPokemon["height"];
  let weight = currentPokemon["weight"];
  let pokemonabilities = currentPokemon["abilities"][0]["ability"]["name"];
  document.getElementById("aboutTable").innerHTML = ``;
  document.getElementById("aboutTable").classList.remove("moves");
  document.getElementById("aboutTable").innerHTML += /*html*/ `
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
function generateBaseStats(currentPokemon) {
  let hp = currentPokemon["stats"]["0"]["base_stat"];
  let attack = currentPokemon["stats"]["1"]["base_stat"];
  let defense = currentPokemon["stats"]["2"]["base_stat"];
  let specialAttack = currentPokemon["stats"]["3"]["base_stat"];
  document.getElementById("aboutTable").innerHTML = ``;
  document.getElementById("aboutTable").classList.remove("moves");
  document.getElementById("aboutTable").innerHTML += /*html*/ `
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
function generateMoves(currentPokemon) {
  let move1 = currentPokemon["moves"]["0"]["move"]["name"];
  let move2 = currentPokemon["moves"]["1"]["move"]["name"];
  let move3 = currentPokemon["moves"]["2"]["move"]["name"];
  let move4 = currentPokemon["moves"]["3"]["move"]["name"];
  document.getElementById("aboutTable").innerHTML = ``;
  document.getElementById("aboutTable").classList.add("moves");
  document.getElementById("aboutTable").innerHTML = /*html*/ `
  <div class="tableDiv">${capitalizeFirstLetter(move1)}</div>
  <div class="tableDiv">${capitalizeFirstLetter(move2)}</div>
  <div class="tableDiv">${capitalizeFirstLetter(move3)}</div>
  <div class="tableDiv">${capitalizeFirstLetter(move4)}</div>
  `;
}
function capitalizeFirstLetter(pokemonName) {
  return pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
}
