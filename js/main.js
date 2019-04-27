
// const fetch = require('node-fetch')

const API_URL = 'https://swapi.co/api'
const filmsList = document.querySelector('.films-list');
const starshipsList = document.querySelector('.starships-list');
const joinList = document.querySelector('.films-ships');

$(document).ready(function() {
    if (!localStorage.getItem("infoArray")) {
        localStorage.setItem("infoArray", JSON.stringify([{
            title: "titulo",
            content: "contenido",
        }]));
        newContent = localStorage.getItem("infoArray");
        newContent = JSON.parse(newContent);

    } else {
        newContent = localStorage.getItem("infoArray");
        newContent = JSON.parse(newContent);
    }

});

async function getFilm (filmId) {
  const url = `${API_URL}/films/${filmId}`
  const filmResponse = await fetch(url)
  const filmJson = await filmResponse.json()
  return filmJson
}

async function getShip (shipUrl) {
  const shipResponse = await fetch(shipUrl)
  const shipJson = await shipResponse.json()
  return shipJson.name
}

async function getAllFilms () {
  const url = `${API_URL}/films`
  const filmsResponse = await fetch(url)
  const filmsJson = await filmsResponse.json()
  const films = filmsJson.results
  return films
}

async function joinFilmAndShips () {
  const films = await getAllFilms()
  const filmNames = films.map(film => film.title)

  const shipsPerFilm = films.map(film => film.starships)
  const filmsShipsPromises = shipsPerFilm.map(film => film.map( ship => getShip(ship) ) )

  const filmsShipsPromisesResolved = filmsShipsPromises.map( film => Promise.all(film) )
  const filmsAndShips = await Promise.all(filmsShipsPromisesResolved)


  for (let index = 0; index < filmNames.length; index++) {
    filmsList.innerHTML += `
      <div class="film-button aside-into-section-right-container" id="ships-${index}">
      <button class="data aside-into-section-right-container text-info">
      Movie: ${filmNames[index]}</button>
      </div>
      `
    starshipsList.innerHTML += `
      <div class="hidden ship-button article-into-section-left-container" data-ship="ships-${index}">
        <button class="data article-into-section-left-container">
          <p>Ships from movie <span class="text-color">${filmNames[index]}</span>: ${filmsAndShips[index]}</p>
        </button>
      </div>
      `
      // if(index == '0'){
      //   const button0 = document
      // };

      // const button + index = document.getElementById('#button-' + index);

  }
  const movieButtons = document.querySelectorAll('.film-button');
  const shipButtons = document.querySelectorAll('.ship-button')

  for (let movieButton of movieButtons) {
    movieButton.addEventListener('click', function(event){
      for (let shipButton of shipButtons) {
        const id = movieButton.getAttribute('id');
        const dataShip = shipButton.getAttribute('data-ship')
        if(id == dataShip){
          shipButton.classList.remove('hidden')
        }
      }
    })
  }

  //
  //
  // const button0 = document.getElementById('#button-0');
  // const button1 = document.getElementById('#button-1');
  // const button2 = document.getElementById('#button-2');
  // const button3 = document.getElementById('#button-3');
  // const button4 = document.getElementById('#button-4');
  // const button5 = document.getElementById('#button-5');
  // const button6 = document.getElementById('#button-6');
  //
  // button0.addEventListener('click', function joinFilmAndShips (event) {
  //   button0.classList.remove('hidden');
  // });
  //
  //
  // const movie1Ships = filmsAndShips[0];
  //
  // console.log('filmNames: ', filmNames)
  // console.log('filmsDigest: ', filmsDigest)
  // console.log('filmsAndShips: ', filmsAndShips[0])
  // console.log('movie1Ships: ', movie1Ships)

// function printData(allData) {
//   for(let data of allData) {
//     filmsList.innerHTML += `
//     <div class="data">
//     <p>Movie: ${filmNames[0]}</p>
//     </div>
//     `
//   }
// }
//
// printData()
//
//
//
//   starshipsList.innerHTML += `
//   <div class="data">
//   <p>Ship: ${filmsAndShips[0]}</p>
//   </div>
//   `
}


// button0.addEventListener('click', function joinFilmAndShips (event) {
//   filmsList.innerHTML += `
//   <div class="data">
//   <button id="button-[index]">Movie: ${movie1Ships}</button>
//   </div>
//   `
//
// });

joinFilmAndShips();

  // .then(success => {
  //   console.warn('success: ', success)
  //   process.exit(0)
  // })
  // .catch(error => {
  //   console.error('ERROR: ', error)
  //   process.exit(1)
  // })
