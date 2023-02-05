import Vue from 'vue'
import Router from 'vue-router'
import MainComponent from '../views/MainComponent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'MainComponent', component: MainComponent }
  ]
})
