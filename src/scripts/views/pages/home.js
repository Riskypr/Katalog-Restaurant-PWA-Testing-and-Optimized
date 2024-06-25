// src/script/views/page/home.js
import Restaurant from '../../data/restaurant'
import API_ENDPOINT from '../../global/api-endPoint'

const HomePage = {
  async render () {
    return `
      <section class="hero">
        <section class="hero-text">
          <h1>Selamat Datang di Katalog Restoran</h1>
          <p>Temukan berbagai restoran terbaik di kota-kota favorit Anda!</p>
        </section>
        <picture>
          <source media="(max-width:600px)" srcset="./hero-image_2-small.jpg">
          <img src="./hero-image_2-large.jpg" alt="Hero Image" />
        </picture>
      </section>      
      <section id="main-content" tabindex="-1">
        <h3>Explore Restaurant</h3>
        <div id="restaurant-list" class="restaurant-list">
          ${this._createSkeletonTemplate(10)}
        </div>
      </section>
    `
  },

  async afterRender () {
    const restaurantListContainer = document.getElementById('restaurant-list')
    try {
      const restaurants = await Restaurant.showListRestaurant()
      restaurantListContainer.innerHTML = ''
      restaurants.forEach((restaurant) => {
        const restaurantItem = document.createElement('div')
        restaurantItem.classList.add('restaurant')
        restaurantItem.innerHTML = `
          <img src="${API_ENDPOINT.IMAGE_MEDIUM(restaurant.pictureId)}" alt="${restaurant.name}" loading="lazy" crossorigin="anonymous"/>
          <h2>${restaurant.name}</h2>
          <p>Kota: ${restaurant.city}</p>
          <p class="rating">★ ${restaurant.rating}</p>
          <button class="detail-link" data-id="${restaurant.id}">Lihat Detail</button>
        `
        restaurantListContainer.appendChild(restaurantItem)
      })
    } catch (error) {
      restaurantListContainer.innerHTML = '<p>Failed to load restaurant data.</p>'
    }

    restaurantListContainer.querySelectorAll('.detail-link').forEach((button) => {
      button.addEventListener('click', async (event) => {
        const restaurantId = event.target.dataset.id
        if (restaurantId) {
          window.location.href = `#/detail/${restaurantId}`
        }
      })
    })
  },

  _createSkeletonTemplate (count) {
    let skeletons = ''
    for (let i = 0; i < count; i++) {
      skeletons += `
        <div class="skeleton">
          <div class="skeleton-image"></div>
          <div class="skeleton-text"></div>
          <div class="skeleton-text short"></div>
        </div>
      `
    }
    return skeletons
  }
}

export default HomePage
