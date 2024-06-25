import API_ENDPOINT from '../global/api-endPoint'

class Restaurant {
  static async showListRestaurant () {
    const response = await fetch(API_ENDPOINT.LIST_RESTAURANT)
    const responseJson = await response.json()
    return responseJson.restaurants
  }

  static async showDetailRestaurant (id) {
    const response = await fetch(API_ENDPOINT.DETAIL_RESTAURANT(id))
    return response.json()
  }
}

export default Restaurant
