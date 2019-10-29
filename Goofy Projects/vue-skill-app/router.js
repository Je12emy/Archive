import Vue from 'vue'
import Router from 'vue-router'
import skills from './src/components/skills.vue'
import About from './src/components/about.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'skills',
      component: skills
    },
    {
      path: '/About/:name',
      name: 'about',
      component: About
    }
  ]
})