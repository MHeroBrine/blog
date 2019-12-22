import Vue from 'vue'
import Router from 'vue-router'

import '@/assets/css/markdown.css'

import Index from '../pages/Index.vue'
import Detail from '../pages/Detail.vue'

import Login from '../pages/Login.vue'
// import _Console from '../pages/Console.vue'
import Introduce from '../pages/Introduce.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{ path: '*', component: Index },
		{ path: '/index', component: Index },
		{ path: '/detail/:id', component: Detail },
	
		{ path: '/login', component: Login },
		// { path: '/console', component: _Console },
		{ path: '/introduce', component: Introduce }
	]
})
