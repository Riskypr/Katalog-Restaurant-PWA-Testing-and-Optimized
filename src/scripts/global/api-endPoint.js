import CONFIG from './config'

const API_ENDPOINT = {
  LIST_RESTAURANT: `${CONFIG.BASE_URL}list`,
  DETAIL_RESTAURANT: (id) => `${CONFIG.BASE_URL}detail/${id}`,
  SEARCH_RESTAURANT: (query) => `${CONFIG.BASE_URL}search?q=${query}`,
  ADD_REVIEW: `${CONFIG.BASE_URL}review`,
  IMAGE_SMALL: (pictureId) => `${CONFIG.BASE_URL}images/small/${pictureId}`,
  IMAGE_MEDIUM: (pictureId) => `${CONFIG.BASE_URL}images/medium/${pictureId}`,
  IMAGE_LARGE: (pictureId) => `${CONFIG.BASE_URL}images/large/${pictureId}`
}

export default API_ENDPOINT
