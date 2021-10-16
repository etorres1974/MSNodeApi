import Vue from 'vue'
import Router from 'vue-router'
import Account from '@/views/Account'
import Shopping from '@/views/Shopping'
import Cart from '@/views/Cart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/account',
      name: 'Account',
      component: Account
    },
    {
      path: '/shopping',
      name: 'Shopping',
      component: Shopping
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    }
  ]
})
