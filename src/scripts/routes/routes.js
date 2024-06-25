import HomePage from '../views/pages/home'
import FavoritePage from '../views/pages/favorite'
import Detail from '../views/pages/detail'

const routes = {
  '/': HomePage, // default page
  '/home-page': HomePage,
  '/favorite-page': FavoritePage,
  '/detail/:id': Detail
}

export default routes
