// Thin, generic wrapper around localStorage. Deliberately knows nothing
// about the bundle builder's data shape — that belongs in
// state/persistence.js. Kept here so it can be reused for any future
// "remember this in the browser" need without dragging in bundle logic.

export function readJSON(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch (err) {
    console.warn(`Could not read "${key}" from localStorage`, err)
    return null
  }
}

export function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (err) {
    console.warn(`Could not write "${key}" to localStorage`, err)
    return false
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(key)
  } catch (err) {
    console.warn(`Could not remove "${key}" from localStorage`, err)
  }
}
