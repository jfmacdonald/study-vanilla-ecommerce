let photos = getSavedPhotos()

/**
 * Fetch photos from endpoint and return an array of photo objects
 *
 * photo object structure:
 * {
 *  	"id": "anchor",
 *  	"name": "Anchor",
 *  	"url": "https://cdn.gomakethings.com/academy/ecommerce/anchor.jpg",
 *  	"description": "A boat sits in a bay of gorgeous topaz water, an anchor line cast from her bow.",
 *  	"price": 29
 *  },
 * @param {string} endpoint:url
 * @returns photo[]
 */
async function getPhotos() {
  // const endpoint = 'https://vanillajsacademy.com/api/photos.json'
  const endpoint = 'https://sparrow-photos.jfmacdonald.workers.dev/'
  if (!photos) {
    try {
      const response = await fetch(endpoint)
      if (!response.ok) throw response
      photos = await response.json()
      savePhotos(photos)
    } catch (error) {
      console.warn(error)
    }
  }
  return photos
}

/**
 * Return one photo given URL query or null
 *
 * @returns {object} photo
 */
function getQueryPhoto() {
  if (!photos) return null
  const url = new URL(window.location.href)
  const id = url.searchParams.get('id')
  if (!id) return null
  return photos.find((foto) => id === foto.id)
}

/**
 * Given an id, return a photo object with that id or null if none
 *
 * @param {string} id
 * @returns {object} photo
 */
function getPhotoById(id) {
  if (!photos) return null
  return photos.find((foto) => id === foto.id) || null
}

/**
 * Save fetched photos in session storage
 *
 * @param {object[]} photos
 */
function savePhotos(photos) {
  sessionStorage.setItem('photos', JSON.stringify(photos))
}

/**
 * Get photos from session storage if they exist
 *
 * @returns {array} photo[] | null
 */
function getSavedPhotos() {
  return JSON.parse(sessionStorage.getItem('photos')) || null
}

export { getPhotos, getQueryPhoto, getPhotoById }
