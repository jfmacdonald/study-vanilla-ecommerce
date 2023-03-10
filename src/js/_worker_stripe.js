/**
 * Create a PHP-style query string from an object
 * @param  {Object} data   The data to serialize into a string
 * @param  {String} prefix The prefix to use before the string
 * @return {String}        The serialized query string
 */
function buildQuery(data, prefix = '') {
  // Determine the data type
  const type = Object.prototype.toString.call(data).slice(8, -1).toLowerCase()

  // Loop through the object and create the query string
  return Object.keys(data)
    .map(function (key, index) {
      // Cache the value of the item
      const value = data[key]

      // Add the correct string if the object item is an array or object
      if (type === 'array') {
        key = prefix + '[' + index + ']'
      } else if (type === 'object') {
        key = prefix ? prefix + '[' + key + ']' : key
      }

      // If the value is an array or object, recursively repeat the process
      if (typeof value === 'object') {
        return buildQuery(value, key)
      }

      // Join into a query string
      return key + '=' + encodeURIComponent(value)
    })
    .join('&')
}

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
  const headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'HEAD, POST, OPTIONS',
    'Access-Control-Allow-Headers': '*'
  })

  // allowed origins
  const allowed = [
    /https?:[/]{2}sparrow.test[/]?$/,
    /https:[/]{2}sparrow[-\w]+\.netlify.app[/]?$/
  ]

  // If domain is not allowed, return error code
  const origin = request.headers.get('origin')
  if (!allowed.some((pattern) => String(origin).match(pattern))) {
    return new Response(`Origin ${String(origin)} not allowed`, {
      status: 403,
      headers
    })
  }

  // Catch-all for non-POST request types
  if (request.method !== 'POST') {
    return new Response('ok', {
      status: 200,
      headers
    })
  }

  // Get checkout session token
  try {
    // Get the request data
    const body = await request.json()
    const { cartIds, successUrl, cancelUrl } = body

    const photos = await SPARROW_PHOTOS.get('photos', { type: 'json' })
    const items = photos
      .filter((photo) => cartIds.includes(photo.id))
      .map((photo) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: photo.name,
            description: photo.description,
            images: [photo.url]
          },
          unit_amount: Math.round(100 * photo.price)
        },
        quantity: 1
      }))

    // Call the Stripe API
    const stripeRequest = await fetch(
      'https://api.stripe.com/v1/checkout/sessions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          'Content-type': 'application/x-www-form-urlencoded'
        },
        body: buildQuery({
          payment_method_types: ['card'],
          mode: 'payment',
          line_items: items,
          success_url: successUrl,
          cancel_url: cancelUrl
        })
      }
    )

    // Get the API response
    const stripeResponse = await stripeRequest.json()

    // Return the data
    return new Response(JSON.stringify(stripeResponse), {
      status: 200,
      headers
    })
  } catch (error) {
    let message = error
    if (typeof error === 'object') message = error.message
    if (typeof message !== 'string')
      message = Object.prototype.toString.call(message).slice(8, -1)
    return new Response(`Unable to reach API - ${message}`, {
      status: 500,
      headers
    })
  }
}

// Listen for API calls
addEventListener('fetch', function (event) {
  event.respondWith(handleRequest(event.request))
})
