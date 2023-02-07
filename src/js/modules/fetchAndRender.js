/**
 * Fetch photos from endpoint and execute callback to render HTML
 *
 * @param {string: url} endpoint
 * @param {function: (photos) => string } callback
 * @returns
 */
async function fetchAndRender(endpoint, callback) {
  const app = document.querySelector('#app')
  if (!app) return
  try {
    const response = await fetch(endpoint)
    if (!response.ok) throw response
    const photos = await response.json()
    app.innerHTML = callback(photos).trim()
  } catch (error) {
    console.warn(error)
  }
}

export default fetchAndRender
