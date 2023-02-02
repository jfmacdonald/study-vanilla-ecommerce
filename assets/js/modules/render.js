function photosHTML(photos) {
  if (!Array.isArray(photos) || !photos.length)
    return '<p> There are no photos at this time. Please try again later. Sorry! </p>'
  const photoHTML = (photo) => `
    <div class="photo">
      <img alt="${photo.description}" src="${photo.url}"/>
      <div>${photo.name}</div>
    </div>`
  return `
    <div id="photos">
      ${photos.map((photo) => photoHTML(photo)).join('\n')}
    </div>
  `
}

function mainHTML(photos) {
  return `
  <h1>Sparrow Photography</h1>
  <p>
    High-end photography from the Seven Seas, brought to you by world-famous
    photographer Captain Jack Sparrow.
  </p>
  ${photosHTML(photos)}
  `
}

/**
 * Fetch photos from endpoint and render HTML
 *
 * @param {string: url} endpoint
 * @returns
 */
async function fetchAndRender(endpoint) {
  const app = document.querySelector('#app')
  if (!app) return
  try {
    const response = await fetch(endpoint)
    if (!response.ok) throw response
    const photos = await response.json()
    app.innerHTML = mainHTML(photos)
  } catch (error) {
    console.warn(error)
  }
}

export { fetchAndRender }
