/**
 * Handle the request
 *
 * @param {Request} request
 * @returns
 */
async function handleRequest(request) {
  const headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS, HEAD',
    'Access-Control-Allow-Headers': '*'
  })

  if (request.method !== 'GET')
    return new Response('ok', { status: 200, headers })

  const photos = await SPARROW_PHOTOS.get('photos')

  return new Response(photos, {
    status: 200,
    headers
  })
}

// Listen for API calls
addEventListener('fetch', function (event) {
  event.respondWith(handleRequest(event.request))
})
