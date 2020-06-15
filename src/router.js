import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';



Vue.use(Router, axios);


const router = new Router({
	base: '/',
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'welcome',
			components: {
				default: () => System.import('./components/Welcome.vue'),
			},
			meta: {
				auth: false
			}
		},
		{
			path: '/about',
			name: 'about',
			components: {
				default: () => System.import('./views/About.vue'),
			},
			meta: {
				auth: false
			}
		},
		{
			path: '/news_and_events',
			name: 'news_events',
			components: {
				default: () => System.import('./views/NewsAndEvents.vue'),
			},
			meta: {
				auth: false
			}
		},
		{   
			path: '/register',
			name: 'register',
			components: {
				default: () => System.import('./components/Register.vue'),
			},
			meta: {
				auth: false
			}
		},
		{   
			path: '/login',
			name: 'login',
			components: {
				default: () => System.import('./components/Login.vue'),
			},
			meta: {
					
			}
		},
		{   
			path: '/forum',
			name: 'forum',
			components: {
				default: () => System.import('./views/Forum.vue'),
			},
			meta: {
					
			}
		},
		{   
			path: '/admin',
			name: 'admin',
			components: {
				default: () => System.import('./views/admin/Admin.vue'),
			},
			meta: {
					
			}
		},
		{   
			path: '/professor',
			name: 'professor-route',
			components: {
				default: () => System.import('./views/Professor.vue'),
			},
			meta: {
					
			}
		},
		{   
			path: '/professor/:viewof',
			name: 'professor-viewof',
			components: {
				default: () => System.import('./views/components/professor/Views.vue'),
			},
			meta: {
					
			}
		},
		{   
			path: '/student/professors',
			name: 's-professors',
			components: {
				default: () => System.import('./views/student/Professors.vue'),
			},
			meta: {
					
			}
		},
		{   
			path: '/student/professors/:id/handouts',
			name: 's-prof-handouts',
			components: {
				default: () => System.import('./views/student/ProfHandouts.vue'),
			},
			meta: {
					
			}
		},
	]
});


// router.beforeEach((to, from, next) => {
// 	if (to.matched.some(record => record.meta.auth)) { 
// 		if(store.state.user) {
// 			if( authHelper.isAuthorize(store.state.user, to.meta.auth.roles)) {
//             	return next()
// 			}else {
// 				return next({
// 					name: 'welcome',
// 					query: {
// 						redirect: to.fullPath
// 					}
// 				})
// 			}
// 		}else {
// 			return next({
// 				path: '/login',
// 				query: {
// 					redirect: to.fullPath
// 				}
// 			})
//       	}
// 	}else {
// 		if(to.name == "login") {
// 			if(authHelper.isLogged(store.state.user)) {
// 				return next('/my-acar')
// 			}
// 		}
// 		return next();
// 	}
// })



export default router;