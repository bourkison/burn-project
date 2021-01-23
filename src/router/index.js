import firebase from 'firebase'
import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import NewExercise from '../views/Exercises/NewExercise.vue'
import ViewExercise from '../views/Exercises/ViewExercise.vue'


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
    path: '/exercises/new',
    name: 'New Exercise',
    component: NewExercise
  },
  {
    path: '/exercises/:exerciseid',
    name: 'View Exercise',
    component: ViewExercise
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// This function checks if user is logged in based on route metadata.
// Calls a promise in firebase.js to wait for user to log in (if on initial load).
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !await firebase.getCurrentUser()) {
    next('login')
  } else {
    next()
  }

  next();
})

export default router
