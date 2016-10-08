// import components
import {Home, Layout} from './screens'

// Routes
export default [
  { path: '/',
    component: Layout,
    indexRoute: {
      component: Home
    }
  }
]
