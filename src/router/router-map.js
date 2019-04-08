
const index = () => import('../views/index.vue')
const page1 = () => import('../views/page1.vue')
const page2 = () => import('../views/page2.vue')

export default [
  { path: '/', name: 'Index', component: index },
  { path: '/page1', name: 'Page1', component: page1 },
  { path: '/page2', name: 'Page2', component: page2 },
  {
    path: '*',
    redirect: '/'
  }
]