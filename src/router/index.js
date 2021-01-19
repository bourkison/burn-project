import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Burn from '../views/Burn.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/signup',
    name: 'Sign Up',
    component: () => import(/*webpackChunkName: "signup" */ '../views/SignUp.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/*webpackChunkName: "signup" */ '../views/Login.vue')
  },
  {
    path: '/burn',
    name: 'Burn',
    component: Burn,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// This function checks if user is logged in based on route metadata
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  console.log(requiresAuth);

  if (requiresAuth && !await firebase.getCurrentUser()) {
    next('login')
  } else {
    next()
  }

  next();
})

export default router
