import API_ENDPOINT from '../../global/api-endPoint'
import Restaurant from '../../data/restaurant'
import UrlParser from '../../routes/url-parse'
import { addFavoriteRestaurant, removeFavoriteRestaurant, getFavoriteRestaurants } from '../../data/indexedDB'

const Detail = {
  async render () {
    return `
      <section id="detail-restaurant"></section>
      <section id="main-content" tabindex="-1"></section>
      <button id="favorite-button">Add to Favorite</button>
      <section id="menu-res">
        <h2>Menu</h2>
        <div id="restaurant-menu">
          <div id="food-menu"></div>
          <div id="drink-menu"></div>
        </div>
      </section>
      <section id="customer-reviews">
        <h2>Customer Reviews</h2>
        <form id="add-review-form">
          <label for="review-name">Your Name:</label>
          <input type="text" id="review-name" name="review-name" required>
          <label for="review-content">Review:</label>
          <textarea id="review-content" name="review-content" required></textarea>
          <button type="submit">
          <span class="material-symbols-outlined">
          post_add
          </span>Submit Review</button>
        </form>
        <ul id="customer-reviews-list"></ul>
      </section>
    `
  },

  async afterRender () {
    const url = window.location.hash.slice(1).toLowerCase()
    const parsedUrl = UrlParser.parseActiveUrlWithoutCombiner(url)
    const { id } = parsedUrl

    const detailRestaurantContainer = document.getElementById('detail-restaurant')
    const customerReviewsList = document.getElementById('customer-reviews-list')
    const foodMenuContainer = document.getElementById('food-menu')
    const drinkMenuContainer = document.getElementById('drink-menu')
    const favoriteButton = document.getElementById('favorite-button')

    if (id) {
      try {
        const restaurant = await Restaurant.showDetailRestaurant(id)
        detailRestaurantContainer.innerHTML = this.createRestaurantDetailHTML(restaurant.restaurant)
        this.renderCustomerReviews(restaurant.restaurant.customerReviews, customerReviewsList)
        this.renderMenu(restaurant.restaurant.menus.foods, foodMenuContainer, 'Foods')
        this.renderMenu(restaurant.restaurant.menus.drinks, drinkMenuContainer, 'Drinks')

        const isFavorite = await this.isFavorite(id)
        if (isFavorite) {
          favoriteButton.innerHTML = `
          <span class="material-symbols-outlined">
          heart_minus
          </span><span>Remove from Favorite</span>`
        } else {
          favoriteButton.innerHTML = `
          <span class="material-symbols-outlined">
          heart_plus
        </span> <span>Add to Favorite</span>`
        }
      } catch (error) {
        // console.error('Error fetching restaurant detail:', error);
      }
    } else {
      // console.error('Restaurant ID is null or undefined');
    }

    const addReviewForm = document.getElementById('add-review-form')
    addReviewForm.addEventListener('submit', async (event) => {
      event.preventDefault()
      const reviewNameInput = document.getElementById('review-name')
      const reviewContentInput = document.getElementById('review-content')
      const restaurantId = id
      const review = {
        id: restaurantId,
        name: reviewNameInput.value,
        review: reviewContentInput.value
      }
      try {
        const response = await fetch(API_ENDPOINT.ADD_REVIEW, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(review)
        })
        const data = await response.json()
        console.log('Review added successfully:', data)
        reviewNameInput.value = ''
        reviewContentInput.value = ''

        this.refreshCustomerReviews(customerReviewsList)
      } catch (error) {
        // console.error('Error adding review:', error);
      }
    })

    favoriteButton.addEventListener('click', async () => {
      try {
        const restaurant = await Restaurant.showDetailRestaurant(id)
        if (!restaurant || !restaurant.restaurant || !restaurant.restaurant.id) {
          // console.error('Invalid restaurant data');
          return
        }

        const restaurantData = {
          id: restaurant.restaurant.id,
          name: restaurant.restaurant.name,
          description: restaurant.restaurant.description,
          city: restaurant.restaurant.city,
          address: restaurant.restaurant.address,
          pictureId: restaurant.restaurant.pictureId,
          rating: restaurant.restaurant.rating
        }

        const isFavorite = await this.isFavorite(restaurantData.id)
        if (isFavorite) {
          await removeFavoriteRestaurant(restaurantData.id)
          favoriteButton.innerHTML = `
          <span class="material-symbols-outlined">
          heart_plus
          </span><span> Add to Favorite</span>`
        } else {
          await addFavoriteRestaurant(restaurantData)
          favoriteButton.innerHTML = `
          <span class="material-symbols-outlined">
          heart_minus
          </span><span>Remove from Favorite</span>`
        }
      } catch (error) {
        // console.error('Error adding/removing restaurant to/from favorite:', error);
      }
    })
  },

  createRestaurantDetailHTML (restaurant) {
    const categories = restaurant.categories.map((category) => category.name).join(', ')
    return `
      <section class="restaurant-detail">
        <h2 class="name">${restaurant.name}</h2>
        <img src="${API_ENDPOINT.IMAGE_MEDIUM(restaurant.pictureId)}" alt="${restaurant.name}" crossorigin="anonymous"/>
        <p class="city">Address: ${restaurant.address} | City: ${restaurant.city}</p>
        <p class="category">Categories: ${categories} </p>
        <p class="rating"> ★ ${restaurant.rating}</p>
        <section class="description">
          <p>${restaurant.description}</p>
        </section>
      </section>
    `
  },

  renderMenu (menuItems, container, title) {
    const menuHTML = `
      <h3>${title}</h3>
      <ul>
        ${menuItems.map((item) => `<li> - ${item.name}</li>`).join('')}
      </ul>
    `
    container.innerHTML = menuHTML
  },

  renderCustomerReviews (reviews, container) {
    container.innerHTML = reviews
      .map(
        (review) => `
      <li>
        <strong>${review.name}</strong>: ${review.review} (${review.date})
      </li>
    `
      )
      .join('')
  },

  async refreshCustomerReviews (container) {
    const url = window.location.hash.slice(1).toLowerCase()
    const parsedUrl = UrlParser.parseActiveUrlWithoutCombiner(url)
    const { id } = parsedUrl

    if (id) {
      try {
        const restaurant = await Restaurant.showDetailRestaurant(id)
        this.renderCustomerReviews(restaurant.restaurant.customerReviews, container)
      } catch (error) {
        // console.error('Error refreshing customer reviews:', error);
      }
    } else {
      // console.error('Restaurant ID is null or undefined');
    }
  },

  async isFavorite (restaurantId) {
    const favoriteRestaurants = await getFavoriteRestaurants()
    return favoriteRestaurants.some((restaurant) => restaurant.id === restaurantId)
  }
}

export default Detail
