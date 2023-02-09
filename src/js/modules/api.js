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
  const endpoint = 'https://vanillajsacademy.com/api/photos.json'
  let photos = []
  try {
    const response = await fetch(endpoint)
    if (!response.ok) throw response
    photos = await response.json()
  } catch (error) {
    console.warn(error)
  }
  return photos
}

function getUrlPhoto(photos) {
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

export { getPhotos, getUrlPhoto, displayPrice }
