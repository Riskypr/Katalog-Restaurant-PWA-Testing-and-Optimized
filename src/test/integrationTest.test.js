/* eslint-disable no-undef */
import 'fake-indexeddb/auto'
import { addFavoriteRestaurant, removeFavoriteRestaurant, getFavoriteRestaurants } from '../scripts/data/indexedDB'
import './structuredClone'

describe('Favorite Restaurant Integration Test', () => {
  beforeEach(async () => {
    // Clear favorite restaurants before each test
    const favoriteRestaurants = await getFavoriteRestaurants()
    favoriteRestaurants.forEach(async (restaurant) => {
      await removeFavoriteRestaurant(restaurant.id)
    })
  })

  test('Harus menambah dan menghapus restoran favorit', async () => {
    const restaurant = { id: 1, name: 'Restaurant Test' }

    await addFavoriteRestaurant(restaurant)

    let favoriteRestaurants = await getFavoriteRestaurants()
    expect(favoriteRestaurants).toContainEqual(restaurant)

    await removeFavoriteRestaurant(restaurant.id)

    favoriteRestaurants = await getFavoriteRestaurants()
    expect(favoriteRestaurants).not.toContainEqual(restaurant)
  })
})
