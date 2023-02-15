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

export { addToCart, removeFromCart, emptyCart, isInCart, getCartItems }
