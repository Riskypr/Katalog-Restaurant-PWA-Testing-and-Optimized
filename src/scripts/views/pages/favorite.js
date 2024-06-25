import { getFavoriteRestaurants } from '../../data/indexedDB'
import API_ENDPOINT from '../../global/api-endPoint'

const FavoritePage = {
  async render () {
    return `
      <section class="favorite">
        <section id="main-content">
          <h3>Favorite Restaurants</h3>
          <div id="restaurants-list" class="restaurant-list"></div>
        </section>
      </section>
    `
  },

  async afterRender () {
    this.renderFavoriteRestaurants()
  },

  async renderFavoriteRestaurants () {
    const favoriteRestaurantsList = document.getElementById('restaurants-list')
    try {
      const favoriteRestaurants = await getFavoriteRestaurants()

      if (favoriteRestaurants.length === 0) {
        favoriteRestaurantsList.innerHTML = `
        <div class="restaurant-keterangan">
        <p class="restaurant-alert">Anda belum memiliki restoran favorit.</p>
        </div>`
      } else {
        favoriteRestaurants.forEach((restaurant) => {
          const restaurantList = document.createElement('div')
          restaurantList.classList.add('restaurant')
          restaurantList.innerHTML = `
              <img src="${API_ENDPOINT.IMAGE_MEDIUM(restaurant.pictureId)}" alt="${restaurant.name}" loading="lazy" crossorigin="anonymous">
              <h2>${restaurant.name}</h2>
              <p class="restaurant-city">Kota: ${restaurant.city}</p>
              <p class="rating">★ ${restaurant.rating}</p>
              <button class="detail-link" data-id="${restaurant.id}">Lihat Detail</button>
          `
          favoriteRestaurantsList.appendChild(restaurantList)
        })
      }
    } catch (error) {
      favoriteRestaurantsList.innerHTML = '<p>Terjadi kesalahan saat memuat data favorit.</p>'
      console.error('Error rendering favorite restaurants:', error)
    }

    favoriteRestaurantsList.querySelectorAll('.detail-link').forEach((button) => {
      button.addEventListener('click', async (event) => {
        const restaurantId = event.target.dataset.id
        if (restaurantId) {
          window.location.href = `#/detail/${restaurantId}`
        } else {
          console.error('Restaurant ID is null or undefined')
        }
      })
    })
  }
}

export default FavoritePage
