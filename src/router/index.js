import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import routes from './router-map'

const router = new Router({
  base: '/news',
  mode: "hash",
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
