'use strict';

const listElement = document.querySelector('.js__list');
const ulFavorites = document.querySelector('.js__list__Favorites');
const inputSelection = document.querySelector('.js__selection');
const inputBtn = document.querySelector('.js__submit');
const serverURL = `https://api.disneyapi.dev/character?`;

let animesDataList = [];

//peticion al servidor
//storage
//FETCH

fetch(serverURL)
  .then((response) => response.json())
  .then((data) => {
    animesDataList = data.data;
    renderListCharacters(animesDataList, listElement);
  });

//FUNCIONS
function renderListCharacters(listData) {
  listElement.innerHTML = '';
  for (const Characters of listData) {
    listElement.innerHTML += renderOnlyCharacter(Characters);
  }
  addEventAnimes();
}

function addEventAnimes() {
  const liElementList = document.querySelectorAll('.js__li__animes');
  for (const li of liElementList) {
    li.addEventListener('click', handleClick);
  }
}

function renderOnlyCharacter(dataObjeto) {
  let html = `<li id="${dataObjeto._id}" class="character__card js__li__animes">
                 <img class="character__img js_img" src="${dataObjeto.imageUrl}" alt="Disney Characters" />
                <p class="character__name js_name">${dataObjeto.name}</p>
                 
              </li>`;

  if (dataObjeto.imageUrl === undefined) {
    const witeImg = 'https://via.placeholder.com/210x295/ffffff/555555/?text=Disney';
    html = `<li id="${dataObjeto._id}"class="character__card">
                                <img class="character__img js_img" src="${witeImg}" alt="Imagen en Blanco" />
                                <p class="character__name js_name">${dataObjeto.name}</p>
                        </li>`;
  }
  return html;
}
let animesFavorites = [];

function handleClick(event) {
  const id = parseInt(event.currentTarget.id);
  const selectedAnimes = animesDataList.find((item) => item._id === id);
  const indexAnimes = animesFavorites.findIndex((item) => item._id === id);
  if (indexAnimes === -1) {
    animesFavorites.push(selectedAnimes);
  } else {
    animesFavorites.splice(indexAnimes, 1);
  }
  // guardar favoritos en LS
  renderListFavorites();
}

//Funcion para renderizar la lista de favoritos
function renderListFavorites() {
  ulFavorites.innerHTML = '';

  for (const Animesfav of animesFavorites) {
    ulFavorites.innerHTML += renderOnlyCharacter(Animesfav);
  }
}

const handleSearch = (event) => {
  event.preventDefault();
  const inputValue = inputSelection.value;
  const filterList = animesDataList.filter((item) =>
    item.name.toLowerCase().includes(inputValue.toLowerCase())
  );
  renderListCharacters(filterList);
};
inputBtn.addEventListener('click', handleSearch);
