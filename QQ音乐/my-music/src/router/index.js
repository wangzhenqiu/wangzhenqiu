import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/Index'

import Singer from '@/pages/Singer'

import SingerDetail from '@/pages/SingerDetail'

import PlaySong from '@/pages/PlaySong'

import Search from '@/pages/Search'

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
            },
            {
              path: '/singer/:sid',
              component: SingerDetail
            },
            {
              path: '/play/:smid/:mid',
              component:PlaySong
            },
            {
              path: '/search',
              component:Search
            }
      ]
})