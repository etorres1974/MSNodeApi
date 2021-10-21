import Vue from 'vue'
import Router from 'vue-router'
import Account from '@/views/Account'
import Agenda from '@/views/Agenda'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/account',
      name: 'Account',
      component: Account
    },
    {
      path: '/agenda',
      name: 'Agenda',
      component: Agenda
    },
  ]
})
