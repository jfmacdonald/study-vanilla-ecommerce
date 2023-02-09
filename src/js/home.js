import '../css/home.css'
import { getPhotos } from './modules/api.js'

function template(photos) {
  const onePhoto = (photo) => `
  <div class="photo">
    <a href="./photo/?id=${encodeURIComponent(photo.id)}">
      <img alt="${photo.description}" src="${photo.url}" />
      <div>${photo.name}</div>
    </a>
  </div>`

  return `
  <div id="photos">
    ${photos.map((photo) => onePhoto(photo)).join('\n')}
  </div>`
}

const app = document.querySelector('#app')
if (app)
  getPhotos().then((photos) => {
    app.innerHTML = template(photos)
  })
else console.warn('No div#app found.')
