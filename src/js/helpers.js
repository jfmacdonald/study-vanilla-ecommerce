function clearUrlQuery(param) {
  const url = new URL(window.location.href)
  if (url.searchParams.has(param)) {
    url.searchParams.delete(param)
    window.history.replaceState(window.history.state, '', url.href)
  }
}

/**
 * Emit a bubbling, cancelable custom event
 *
 * @param {string} type - the event type
 * @param {*} [detail=null] - attached event.detail
 * @param {EventTarget} [target=document] - the event target
 * @returns {boolean} dispatched - false if cancelled
 */
function emit(type, detail = null, target = document) {
  let dispatched = false
  if (!(target instanceof EventTarget))
    throw new Error(`Invalid EventTarget ${target} in emit$(${type}, ...)`)
  try {
    const event = new CustomEvent(type, {
      bubbles: true,
      cancelable: true,
      detail
    })
    dispatched = target.dispatchEvent(event)
  } catch (error) {
    throw new Error(`emit(${type},...): ${error}`)
  }
  return dispatched
}

/**
 * Format a number value formatted as [internationalized] currency
 *
 * @param {number} value
 * @param {string} [currency = 'USD']
 * @returns {string} currency
 */
function getCurrencyString(value, currency = 'USD') {
  if (Number(value) > 0)
    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency
    }).format(Number(value))
  return '0'
}

/**
 * Return an HTML element itself or by document selector query
 *
 * @param {HTMLElement | string} selector - an element or valid query selector
 * @returns {HTMLElement | null} element
 */
function getElement(selector) {
  if (selector instanceof HTMLElement) return selector
  if (typeof selector === 'string') return document.querySelector(selector)
  throw new Error(`getElement(${selector}): invalid selector`)
}

/**
 * Get the prototype "Type" of a JavaScript entity
 * Examples:
 *    {}        'Object'
 *    []        'Array'
 *    42        'Number'
 *    () => {}  'Function'
 *    undefined 'Undefined'
 *
 * @param {*} entity - any JavaScript thing
 * @returns {string} type
 */
function getType(entity) {
  return Object.prototype.toString.call(entity).slice(8, -1)
}

/**
 * Get array of an element’s descendants that can be reached with Tab key
 *
 * @param {HTMLElement} rootElement
 * @returns HTMLElement[] | null
 */
function getDescendantTabStops(rootElement) {
  if (!(rootElement instanceof HTMLElement)) return null
  const selectors = [
    'a[href]',
    'area[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex="0"]'
  ]
    .map((selector) => `:scope ${selector}`)
    .join(',')

  return Array.from(rootElement.querySelectorAll(selectors).values())
}

export {
  clearUrlQuery,
  emit,
  getCurrencyString,
  getElement,
  getType,
  getDescendantTabStops
}
