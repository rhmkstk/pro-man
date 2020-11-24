import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      name: 'HandleWorkspaces',
      path: '/handleworkspaces',
      component: () =>
        import(
          /* webpackChunkName: "dentisAccount" */ '@/components/HandleWorkspaces'
        )
    },
    {
      name: 'Workspaces',
      path: '/workspace/:name',
      component: () =>
        import(
          /* webpackChunkName: "dentisAccount" */ '@/components/Workspace'
        )
    }
  ],
  mode: 'history'
})

export default router
