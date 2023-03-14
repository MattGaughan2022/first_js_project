//backslash in a string to announce non-normal reading of a symbol
// like "she said \"Yes!\" to the proposal"
// complex vs primitive data types
// complex uses pointers to stored data vs primitive
// containing data directly
// https://pokedex.org/

let pokemonRepository = (function () {

    let pokemonList = [];
    
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon){
        if(
            typeof pokemon === 'object'
        ){
            pokemonList.push(pokemon);
        } else {
            console.log('pokemon input is not correct')
        }
    }

    function getAll(){
        return pokemonList;
    }

    function addListItem(pokemon){
        let visibleList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listItem.appendChild(button);
        visibleList.appendChild(listItem);
        button.addEventListener('click', function (event){
            showDetails(pokemon.name);
        });
    }

    function loadList(){
        return fetch(apiUrl).then(function (response) {
            return response.json();
          }).then(function (json) {
            json.results.forEach(function (item) {
              let pokemon = {
                name: item.name,
                detailsUrl: item.url
              };
              add(pokemon);
            });
          }).catch(function (e) {
            console.error(e);
          })
    }

    function loadDetails(item){
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
    }

    function showDetails(pokemon){
        console.log(pokemon);
    }

    return{
         add: add,
         getAll: getAll,
         loadList: loadList,
         loadDetails: loadDetails,
         addListItem: addListItem,
         showDetails: showDetails
        };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });


// pokemonRepository.getAll().forEach(function (pokemon){
//     pokemonRepository.addListItem(pokemon);
// });

// pokemonRepository.getAll().forEach(function (pokemon){
//     let visibleList = document.querySelector('.pokemon-list');
//     let listItem = document.createElement('li');
//     let button = document.createElement('button');
//     button.innerText = pokemon.name;
//     button.classList.add('button-class');
//     listItem.appendChild(button);
//     visibleList.appendChild(listItem);
// });