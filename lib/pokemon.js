import Mustache from "mustachejs";

const cardTemplate = document.getElementById('cardTemplate').innerHTML
const cardsContainer = document.getElementById('cardsContainer')

const infoTemplate = document.getElementById('infoTemplate').innerHTML

const infoContainer = document.getElementById('infoContainer')

const url = 'https://pokeapi.co/api/v2/pokemon?limit=10'
fetch(url)
  .then( result => result.json())
  .then((data) => {
    console.log('Primeiro Fetch')
    data.results.forEach((result) => {
      fetch(result.url)
        .then(result => result.json())
        .then((data) => {
          console.log('Segundo Fetch');
          const pokemon = {
            name: data.name,
            imageUrl: data.sprites.front_default,
            types: data.types.map((aType) => {
              return aType.type.name
            }).join(', ')
          }
          // console.log(pokemon);

          const output = Mustache.render(cardTemplate, pokemon)
          cardsContainer.insertAdjacentHTML('beforeend', output)

          document.getElementById(data.name).addEventListener('click', (event) => {
            // console.log('click em um card');
            const outputInfo = Mustache.render(infoTemplate, pokemon)
            infoContainer.innerHTML = outputInfo
          })

        })
    })
  })

  console.log('final do código');
