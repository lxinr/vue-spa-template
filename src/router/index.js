import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import routes from './router-map'
import { BASE as base } from '@src/config'

const router = new Router({
  base,
  mode: "hash",
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
