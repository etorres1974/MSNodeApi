import Vue from 'vue'
import Router from 'vue-router'
import Account from '@/components/Account'
import Shopping from '@/components/Shopping'
import Cart from '@/components/Cart'

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
