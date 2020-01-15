import Vue from 'vue'
import VueRouter from 'vue-router'
import Nav from '@/views/Nav.vue'
import Permission from '../views/Permission.vue'
import Role from '../views/Role.vue'
import Index from '../views/Index.vue'


Vue.use(VueRouter)

const routes = [
	{
		path: '/nav',
		name : 'nav',
		component: Nav,
		children: [
			{
				path: 'permission',
				name: 'permission',
				component: Permission,
			},
			{
				path: 'permission',
				name: 'permission',
				component: Permission,
			},
			{
				path: 'role',
				name: 'role',
				component: Role,
			},
			{
				path: 'index',
				name: 'index',
				component: Index,
			},
		]
	},
]

const router = new VueRouter({
  routes
})

export default router
