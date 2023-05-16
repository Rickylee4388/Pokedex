let currentPokemon;
let Pokemon = "bulbasaur";

async function loadPokemon() {
  for (let i = 1; i < 152; i++) {
    let number = i;
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    let name = currentPokemon["forms"][0]["name"];
    let pokImg =
      currentPokemon["sprites"]["other"]["dream_world"]["front_default"];
    
    let pokType = currentPokemon["types"]["0"]["type"]["name"];
    
    document.getElementById("pokemonList").innerHTML += /*html*/ `
      <div id="#00${number}" class="pokemonID ${pokType} " onclick='openPokeCard(${i})'>
        <b>${capitalizeFirstLetter(name)}</b>
        <div class="d-flex mt20">        
          <img src="${pokImg}" alt="">
          <div id="type" class="type ${pokType}-light">${pokType} </div>
      

        </div>
      </div>

    `;
  }
}
async function openPokeCard(i) {
  let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
  let response = await fetch(url);
  currentPokemon = await response.json();
  renderPokemonInfo();
  document.getElementById("pokeCard").classList.remove("d-none");
  document.getElementById("pokedexAll").classList.add("d-none");
}
function closePokeCard() {
  document.getElementById("pokeCard").classList.add("d-none");
  document.getElementById("pokedexAll").classList.remove("d-none");
}

function renderPokemonInfo() {
  let pokImg = currentPokemon["sprites"]["other"]["home"]["front_default"];
  let pokemonName = currentPokemon["name"];
  document.getElementById("pokemonName").innerHTML =
    capitalizeFirstLetter(pokemonName);
  document.getElementById("pokemonImage").src = pokImg;
  let name = currentPokemon["forms"][0]["name"];
  let pokemonabilities = currentPokemon["abilities"];
  let species = currentPokemon["types"]["0"]["type"]["name"];
  let height = currentPokemon["height"];
  let weight = currentPokemon["weight"];
  console.log("Pokemon is", name);
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
                    
                </td>
            </tr>
    `;
}

function capitalizeFirstLetter(pokemonName) {
  return pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
}
