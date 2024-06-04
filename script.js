const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImg = document.querySelector('.pokemon-img');

const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
const btnonPrev = document.querySelector('.btn-prev');
const btnonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchpokemon= async (pokemon) => {
    const APIResponse =  await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);   
    
    if (APIResponse.status === 200) {
      const data = await APIResponse.json();
      return data;
    }
}

const renderpokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = '';

    const data = await fetchpokemon(pokemon);

    if (data) {
    pokemonImg.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
   } else {
    pokemonImg.style.display = 'none';
    pokemonName.innerHTML = 'Not Found :c';
    pokemonNumber.innerHTML = '';
   }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderpokemon(input.value.toLowerCase())
});

btnonPrev.addEventListener('click', () => {
    if (searchPokemon > 1)
    searchPokemon -= 1;
    renderpokemon(searchPokemon);
});

btnonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderpokemon(searchPokemon);
});

renderpokemon(searchPokemon)