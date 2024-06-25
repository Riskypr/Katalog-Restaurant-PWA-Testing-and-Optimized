import { setupHamburgerMenu } from './hamburger.js'
import UrlParser from '../routes/url-parse'
import routes from '../routes/routes'
import SpinnerLoading from './spinner-loading.js'
import { setupHeaderScroll } from './header-scroll.js'

const spinnerLoading = Object.create(SpinnerLoading)

class App {
  _content = document.getElementById('_content')

  constructor () {
    setupHamburgerMenu()
    setupHeaderScroll() // Panggil setupHeaderScroll di sini
  }

  async renderPage () {
    spinnerLoading.show()
    const url = UrlParser.parseActiveUrlWithCombiner()
    console.log('Current URL:', url)
    const page = routes[url]
    if (page) {
      try {
        this._content.innerHTML = await page.render()
        await page.afterRender()
      } catch (error) {
        console.error('Failed to load data:', error)
        spinnerLoading.hide()
        spinnerLoading.showOfflineMessage()
        return
      }
    } else {
      console.error('Route not found for URL:', url)
    }
    spinnerLoading.hide()
    spinnerLoading.hideOfflineMessage()
  }
}

export default App
