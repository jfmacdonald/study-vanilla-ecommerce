import { render } from 'reefjs'
import { emit, getElement, getType } from './helpers'

/**
 * A Proxy handler that reacts to value changes in an object or any of
 * its children by emitting a document event of specified type.
 *
 * @param {*} data - the watched object
 * @returns
 */
function watchHandler(data, eventType) {
  if (!(data instanceof Object))
    throw new Error(`Cannot watch a ${getType(data)}`)
  return {
    get(obj, prop) {
      if (prop === '__isWatched') return true
      if (!(obj[prop] instanceof Object) || obj[prop].__isWatched)
        return obj[prop]
      return new Proxy(obj[prop], watchHandler(data))
    },
    set(obj, prop, value) {
      if (!(obj instanceof Object)) return false
      if (obj[prop] === value) return true
      obj[prop] = value
      emit(eventType, data)
      return true
    },
    deleteProperty(obj, prop) {
      try {
        delete obj[prop]
        emit(eventType, data)
      } catch (error) {
        console.error(`Error in watchHandler: ${error}`)
        return false
      }
      return true
    }
  }
}

function watch(data, eventType = 'watch') {
  const ob = data instanceof Object ? data : { value: data }
  return new Proxy(ob, watchHandler(ob, eventType))
}

function component(selector, generator, watchEvent = 'watch') {
  const root = getElement(selector)
  if (!root) throw new Error(`Cannot find element ${selector}`)
  render(root, generator())
  document.addEventListener(watchEvent, () => {
    render(root, generator())
  })
}

export { component, watch }
