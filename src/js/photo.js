import '../css/photo.css'
import { getPhotos, getUrlPhoto, displayPrice } from './modules/api.js'

function template(photo) {
  if (!photo) return ''

  const text = (photo) => `
    <div class="photo-single__info">
      <header>
        <h1 class="photo-single__name">${photo.name}</h1>
        <span class="photo-single__price">${displayPrice(photo.price)}</span>
      </header>
      <p class="photo-single__description"> ${photo.description} </p>
    </div>`

  const image = (photo) => `
    <div class="photo-single__image">
      <img alt="${photo.description}" src="${photo.url}" />
    </div>`

  return `<div class="photo-single">${image(photo)}${text(photo)}</div>`
}

function notFound() {
  return `
  <div class="photo-single--notfound">
    <h1>Not Found</h1>
    <p>Oh, oh. We could not find a photo matching those search parameters. Sorry!</p>
  </div>`
}

const app = document.querySelector('#app')
if (app)
  getPhotos().then((photos) => {
    const photo = getUrlPhoto(photos)
    app.innerHTML = photo ? template(photo) : notFound()
  })
else console.warn('No div#app found.')
