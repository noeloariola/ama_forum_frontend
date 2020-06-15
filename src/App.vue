<template>
   <v-app>
      <v-app-bar color="#8e0404" dense dark app>
         <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
         <router-link tag="v-toolbar-title" :to="{name: 'welcome'}">AMA Forum</router-link>
         <!-- <v-toolbar-title>AMA Forum</v-toolbar-title> -->
         <v-spacer />
         {{ type }}
         <v-menu left bottom >
            <template v-slot:activator="{ on }">
               <v-btn icon v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
               </v-btn>
            </template>

            <v-list>
               <router-link tag="v-list-item"
                  v-for="menu in toolbarMenus"
                  :key="menu.label"
                  :to="{name: menu.routeName, params: menu.param}"
               >
                  <v-list-item-title>{{ menu.label }}</v-list-item-title>
               </router-link>
               <v-list-item @click="logout" v-if="isLogged">
                  <v-list-item-title>Logout</v-list-item-title>
               </v-list-item>
            </v-list>
         </v-menu>
      </v-app-bar>
      <v-content>
         <router-view @logged="setAccount"/>
      </v-content>
   </v-app>
</template>

<script>
import router from './router.js';
import menus from './js/menus.js';
import store from './store';

export default {
   name: 'App',

   components: {
      
   },
   mounted() {
     this.type = store.state.user.type;
   },
   data: () => ({
      isLogged: (store.state.user != null),
      type: '',
      routes: [
         {title: 'login', name: 'login'},
         {title: 'register', name: 'register'},
      ],
      toolbarMenus: menus.menus(store.state.user),
   }),
   computed: {
      user: {
         get() {
            return this.store.state.user;
         }, 
         set: val => {
            return (this.store.state.user = val);
         }
      }
   },
   watch: {
      $route(to, from) {
         // if(from.fullPath === to.fullPath) return;
         // if(from.params.viewof && from.params.viewof != to.params.viewof){
            // router.push({name: to.name, params: { viewof: to.params.viewof }});
            
         // }
      }
   },
   methods: {
      setAccount(account) {
         this.type = account.type;
         this.toolbarMenus = menus.menus(account)
         this.isLogged = true
         console.log('loggedIn: ', account)
      },
      loggedStas(stat) {
         this.isLogged = true
      },
      logout() {
         axios.post(window.basePath + '/api/logout').then(res => {
            window.location = window.basePath;
         });
      }
   },
   beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
    console.log('BA');
   }
};
</script>
