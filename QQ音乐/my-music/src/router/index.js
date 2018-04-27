import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/Index'

import Singer from '@/pages/Singer'

Vue.use(Router)


export default new Router({
      routes: [
            {
              path: '/',
              component: Index
            },
            {
              path: '/index',
              component: Index
            },
            {
              path: '/singer',
              component: Singer
            }
      ]
})