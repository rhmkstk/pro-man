import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      name: 'HandleWorkspaces',
      path: '/handleworkspaces',
      component: () => import('@/views/handleWorkspaces'),
      beforeEnter: (to, from, next) => {
        if (store.getters.isUserExist) next()
        else next({ name: 'Login' })
      }
    },
    {
      name: 'Workspaces',
      path: '/workspace/:name',
      component: () => import('@/views/workspace'),
      beforeEnter: (to, from, next) => {
        if (store.getters.isUserExist) next()
        else next({ name: 'Login' })
      }
    },
    {
      name: 'Login',
      path: '/',
      component: () => import('@/views/login'),
      beforeEnter: (to, from, next) => {
        if (!store.getters.isUserExist) next()
        else next({name: 'HandleWorkspaces'})
        // else next({ name: `${from.name}` })
      }
    },
    {
      name: 'NotFound',
      path: '/notFound',
      component: () => import('@/views/notFound'),
    },
    {
      path:'*',
      redirect:{name: 'NotFound'}
    }
  ],
  mode: 'history'
})

export default router
