import { watch } from '@/js/reactive'
const cart = watch(Object.assign({}, JSON.parse(localStorage.getItem('cart'))))

/**
 * Add item 'id' to cart
 *
 * @param {string} id
 */
function addToCart(id) {
  cart[id] = true
  localStorage.setItem('cart', JSON.stringify(cart))
}

/**
 * Remove item 'id' from cart
 *
 * @param {string} id
 */
function removeFromCart(id) {
  delete cart[id]
  localStorage.setItem('cart', JSON.stringify(cart))
}

/**
 * Clear cart contents
 */
function emptyCart() {
  Object.keys(cart).forEach((id) => {
    delete cart[id]
  })
  localStorage.removeItem('cart')
  console.log(`empty cart: ${Object.keys(cart).join(' ')}`)
}

/**
 * Get array of items in cart
 *
 * @returns string[]
 */
function getCartItems() {
  return Object.keys(cart)
}

/**
 * Is item 'id' in cart?
 *
 * @param {string} id
 * @returns boolean
 */
function isInCart(id) {
  return !!cart[id]
}

function getUrlItems() {
  const itemString = new URL(window.location.href).searchParams.get('items')
  return itemString?.split(',') || []
}

function restoreCart(items) {
  console.log(`Restoring cart ids: ${items.join(' ')}`)
  emptyCart()
  items.forEach((item) => addToCart(item))
}

export {
  addToCart,
  emptyCart,
  getCartItems,
  getUrlItems,
  isInCart,
  removeFromCart,
  restoreCart
}
