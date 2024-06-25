import 'regenerator-runtime'
import '../styles/main.css'
import '../styles/responsif-style.css'
import App from '../scripts/views/app'
import swRegister from './views/utils/sw-register'

const app = new App()

function loadContent () {
  app.renderPage()
  swRegister()
}

window.addEventListener('DOMContentLoaded', loadContent)
window.addEventListener('hashchange', loadContent)
