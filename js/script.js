'use strict';

const API_URL_FILMS = "https://swapi.co/api/films"
const API_URL_STARSHIPS = "https://swapi.co/api/starships";
const filmsList = document.querySelector('.films-list');
const starshipsList = document.querySelector('.starships-list');
const joinList = document.querySelector('.films-ships');

// Función que se encarga de hacer la petición a un url que se le pasa como parámetro.
function filmsRequest(url) {
  fetch(url)
    .then(function(respuesta){
      return respuesta.json();
    })
    .then(function(resp){
      printFilms(resp.results);
      requestNextPage(resp);
    })
    .catch(function() {
      console.log('No recibí respuesta.');
    })
}

//Función para ships

// Función que se encarga de revisar si es la última página (En caso de no serlo, vuelve a llamara a swRequest())
function requestNextPage(data) {
  if(data.next == '') {
    console.log('No hay next.')
  }
  else {
    console.log(starships.next);
    swRequest(data.next);
  }
}

// Llamada de la función swRequest pot primera vez, pasandole como parametro la primera url
filmsRequest(API_URL_FILMS);

// function getStarshipInfo(starshipUrl) {
//   fetch(starshipUrl)
//     .then(response => response.json())
//     .then(starship => {
//
//     })
// }

// Función que se encarga de crear las tarjetas con los datos de la api e inyectarlas en el Html
function printFilms(films) {
  for(let film of films) {
    if(film.dimension != 'unknown') {
      filmsList.innerHTML += `
          <div class="data ${film.title}">
            <p>Movie: ${film.title}</p>
            <p>Ship: ${film.starships}</p>
          </div>
        `

        //Función para starships
        shipsRequest(API_URL_STARSHIPS);

        function shipsRequest(url) {
          fetch(url)
          .then(function(respuesta){
            return respuesta.json();
          })
          .then(function(resp){
            printShips(resp.results);
            requestNextPage(resp);
          })
          .catch(function() {
            console.log('No recibí respuesta.');
          })
        }

        function printShips(starships) {
          for(let ship of starships) {
            if(ship.dimension != 'unknown') {
              starshipsList.innerHTML += `
              <div class="data ${ship.name}">
              <p>Ship: ${ship.name}</p>
              <p>URL: ${ship.url}</p>
              <p>Film: ${ship.films}</p>
              </div>
              `
            }
            // else {
              //   starshipsList.innerHTML += `
              //     <li class="film unknown ${ship.type}">
              //       ${ship.name} (${ship.type}) - ${ship.dimension}</p>
              //     </li>
              //     `
              // }
            }

            function printData() {
              for(i=0 ; i < film.lenght ; i++) {
                if(film.starship[i] == ship.url) {
                  joinList.innerHTML += `
                  <div class="data ${film.title} ${ship.name}">
                  <p>Film: ${film.title}</p>
                  <p>Ship: ${ship.name}</p>
                  </div>
                  `
                }
              }
            }


          }
    }
    // else {
    //   filmsList.innerHTML += `
    //     <li class="film unknown ${film.type}">
    //       ${film.name} (${film.type}) - ${film.dimension}</p>
    //     </li>
    //     `
    // }
  }
}
