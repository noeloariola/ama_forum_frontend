<template>
  <v-container>
     <v-row justfy="space-around" class="d-flex justify-center align-center">
      <v-col cols="12" lg="6" md="6" sm="12" xs="12">
         <v-img aspect-ratio="1.7" contain  :src="'./image/home_pic.png'"></v-img>
      </v-col>

      

     </v-row>
    <v-row class="text-center" v-if="isLogged">
      <v-col cols="12">
        <!-- <h1>APP Title</h1> -->
      </v-col>
      <v-col cols="12">
        <v-btn
          color="red darken-4"
          dark
          @click="$router.push({name: 'login'})"
        >
          Login
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import store from '../store';

  export default {
    data: () => ({
      isLogged: (store.state.user == null),
      imagesNewsEvents: [
         
      ]
    }),
    mounted() {
       this.init()
    },
    methods: {
       init() {
          axios.get(window.basePath + '/api/news_and_events').then(res => {
             this.imagesNewsEvents = res.data.images
          }).catch(err => {
             console.log(err.response.data)
          })
       }
    },
    computed: {
       user: {
         get() {
            return store.state.user;
         }, 
         set: val => {
            return (store.state.user = val);
         }
      }
    }
  }
</script>
