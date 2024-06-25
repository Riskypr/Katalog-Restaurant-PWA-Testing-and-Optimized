const indexedDBName = 'restaurant-catalog'
const favoriteRestaurantsStore = 'favorite-restaurants'

// Inisialisasi IndexedDB
function initIndexedDB () {
  const request = indexedDB.open(indexedDBName, 1)

  request.onupgradeneeded = (event) => {
    const db = event.target.result
    if (!db.objectStoreNames.contains(favoriteRestaurantsStore)) {
      db.createObjectStore(favoriteRestaurantsStore, { keyPath: 'id' })
    }
  }

  request.onerror = (event) => {
    console.error('Failed to initialize IndexedDB:', event)
  }
}

// Menambahkan restoran ke favorit
export function addFavoriteRestaurant (restaurant) {
  const request = indexedDB.open(indexedDBName, 1)

  request.onsuccess = (event) => {
    const db = event.target.result
    const transaction = db.transaction(favoriteRestaurantsStore, 'readwrite')
    const store = transaction.objectStore(favoriteRestaurantsStore)
    store.add(restaurant)
  }

  request.onerror = (event) => {
    console.error('Failed to add restaurant to favorites:', event)
  }
}

// Menghapus restoran dari favorit
export function removeFavoriteRestaurant (restaurantId) {
  const request = indexedDB.open(indexedDBName, 1)

  request.onsuccess = (event) => {
    const db = event.target.result
    const transaction = db.transaction(favoriteRestaurantsStore, 'readwrite')
    const store = transaction.objectStore(favoriteRestaurantsStore)
    store.delete(restaurantId)
  }

  request.onerror = (event) => {
    console.error('Failed to remove restaurant from favorites:', event)
  }
}

// Mendapatkan daftar restoran favorit
export function getFavoriteRestaurants () {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(indexedDBName, 1)

    request.onsuccess = (event) => {
      const db = event.target.result
      const transaction = db.transaction(favoriteRestaurantsStore, 'readonly')
      const store = transaction.objectStore(favoriteRestaurantsStore)

      const result = []
      const cursorRequest = store.openCursor()

      cursorRequest.onsuccess = (event) => {
        const cursor = event.target.result
        if (cursor) {
          result.push(cursor.value)
          cursor.continue()
        } else {
          resolve(result)
        }
      }

      cursorRequest.onerror = (event) => {
        console.error('Failed to get favorite restaurants:', event)
        reject(event)
      }
    }

    request.onerror = (event) => {
      console.error('Failed to access IndexedDB:', event)
      reject(event)
    }
  })
}

initIndexedDB()
