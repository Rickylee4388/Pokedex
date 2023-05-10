let currentPokemon;
let Pokemon = "bulbasaur";

async function loadPokemon() {

  if (document.getElementById("inputPokemon").value == "") {
    let url = `https://pokeapi.co/api/v2/pokemon/${Pokemon}`;
    let response = await fetch(url);
    console.log("Pokemon is", Pokemon);
    currentPokemon = await response.json();
    renderPokemonInfo();
  } else {
    let Pokemon = document.getElementById("inputPokemon").value;
    let url = `https://pokeapi.co/api/v2/pokemon/${Pokemon}`;
    let response = await fetch(url);
    console.log("Pokemon is", Pokemon);
    currentPokemon = await response.json();
    renderPokemonInfo();
  }
  for (let i = 1; i < 152; i++) {
    let number = i;

    let url = `https://pokeapi.co/api/v2/pokemon/${i}`
    let response = await fetch(url);
    currentPokemon = await response.json();
    let name = currentPokemon["forms"][0]["name"];

    document.getElementById('pokemonList').innerHTML+=
    /*html*/`
      <div id="#00${number}" class="pokemonID" onclick=loadPokemon(i)>${name}</div>
    `
  }

}

function renderPokemonInfo() {
  let pokImg =
    currentPokemon["sprites"]["other"]["dream_world"]["front_default"];
  let pokemonName = currentPokemon["name"];
  document.getElementById("pokemonName").innerHTML =
    capitalizeFirstLetter(pokemonName);
  document.getElementById("pokemonImage").src = pokImg;

  let pokemonabilities = currentPokemon["abilities"];
  let species = currentPokemon["types"]["0"]["type"]["name"];
  let height = currentPokemon["height"];
  let weight = currentPokemon["weight"];
  document.getElementById("aboutTable").innerHTML = ``;
  document.getElementById("aboutTable").innerHTML += /*html*/ `
            <tr>
                <td class="tdAbout1">Species</td>
                <td id="species">${species}</td>
            </tr>
            <tr>
                <td class="tdAbout1">Height</td>
                <td id="height">${height} ft</td>
            </tr>
            <tr>
                <td class="tdAbout1">Weight</td>
                <td id="weight">${weight} lb</td>
            </tr>
            <tr>
                <td class="tdAbout1">Abilities</td>
                <td id="abilities">
                    ${pokemonabilities[0]["ability"]["name"]}<br>
                    ${pokemonabilities[1]["ability"]["name"]}
                </td>
            </tr>
    `;
}

function capitalizeFirstLetter(pokemonName) {
  return pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
}
