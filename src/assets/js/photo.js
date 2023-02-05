import '../css/photo.css'
import fetchAndRender from './modules/fetchAndRender'

/**
 * photo json structure
 * {
 *  	"id": "anchor",
 *  	"name": "Anchor",
 *  	"url": "https://cdn.gomakethings.com/academy/ecommerce/anchor.jpg",
 *  	"description": "A boat sits in a bay of gorgeous topaz water, an anchor line cast from her bow.",
 *  	"price": 29
 *  },
 *****************************/

function getSearchedPhoto(photos) {
  const url = new URL(window.location.href)
  const id = url.searchParams.get('id')
  if (!id) return null
  return photos.find((foto) => id === foto.id)
}

function displayPrice(price) {
  if (Number(price) > 0)
    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'USD'
    }).format(Number(price))
  return ''
}

function text(photo) {
  if (!photo) return ''
  return `
  <div class="photo-single__info">
    <header>
      <h1 class="photo-single__name">${photo.name}</h1>
      <span class="photo-single__price">${displayPrice(photo.price)}</span>
    </header>
    <p class="photo-single__description"> ${photo.description} </p>
  </div>
  `
}

function image(photo) {
  return `
  <div class="photo-single__image">
    <img alt="${photo.description}" src="${photo.url}" />
  </div>
  `
}

function notFound() {
  return `<div class="photo-not-found">
    <h1>Not Found</h1>
    <p>Oh, oh. We could not find a photo matching those search parameters. Sorry!</p>
  </div>`
}

const html = (photos) => {
  const photo = getSearchedPhoto(photos)
  if (photo)
    return `
      <div class="photo-single">
        ${image(photo)}
        ${text(photo)}
      </div>
    `
  return notFound()
}

fetchAndRender('https://vanillajsacademy.com/api/photos.json', html)
