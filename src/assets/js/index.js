import '../css/index.css'
import fetchAndRender from './modules/fetchAndRender'

function photosHTML(photos) {
  if (!Array.isArray(photos) || !photos.length)
    return '<p> There are no photos at this time. Please try again later. Sorry! </p>'
  const photoHTML = (photo) => `
    <div class="photo">
      <a href="./photo/?id=${encodeURIComponent(photo.id)}">
        <img alt="${photo.description}" src="${photo.url}" />
        <div>${photo.name}</div>
      </a>
    </div>`
  return `
    <div id="photos">
      ${photos.map((photo) => photoHTML(photo)).join('\n')}
    </div>
  `
}

function html(photos) {
  return `
  <h1>Sparrow Photography</h1>
  <p>
    High-end photography from the Seven Seas, brought to you by world-famous
    photographer Captain Jack Sparrow.
  </p>
  ${photosHTML(photos)}
  `
}

fetchAndRender('https://vanillajsacademy.com/api/photos.json', html)
