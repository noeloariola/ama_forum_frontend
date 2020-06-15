<template>
  <v-container>
      <v-row class="justify-center align-center" v-resize="onResize" dense>
         <v-col cols="12" md="12">
            <v-carousel
               cycle
               max-height="720"
               hide-delimiter-background
               show-arrows-on-hover
            >
               <v-carousel-item
                  v-for="(slide, i) in slides"
                  :key="i"
                  :src="slide.src"
                  class="text-center"
               >
                  <v-sheet
                  :color="'transparent'"
                  height="100%"
                  >
                  <v-row
                     class="fill-height"
                     align="center"
                     justify="center"
                     :color="'orange'"
                  >
                     <div :class="text_size" :color="'orange'">{{ slide.caption }} {{ windowSize.x }}</div>
                  </v-row>
                  </v-sheet>
               </v-carousel-item>
            </v-carousel>
         </v-col>
         <v-col cols="12" md="12">

            <v-card
               class="align-center"
               max-width="1300"
            >
               <v-img
                  class="white--text align-center"
                  height-md="400px"
                  :src="'http://192.168.1.6:9001/image/1.jpg'"
                  contain
               >
                  <v-card-title></v-card-title>
               </v-img>

               <v-card-subtitle class="pb-0"></v-card-subtitle>

               <v-card-text class="text--primary">
                  <div>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
               </v-card-text>

            </v-card>


           <!-- <div style=""> -->
               <!-- <v-img aspect-ratio="1" contain
                           :src="item.image" 
                  ></v-img> -->
               <!-- <image :src="item.image"></image> -->
           <!-- </div> -->
            <!-- <p class=""> {{item.desc}} </p> -->

         </v-col>

         
         <v-col cols="12" md="4" sm="12" xs="12">
               <v-card
                  class="mx-auto"
                  max-width="400"
               >
                  <v-img
                     class="white--text align-end"
                     height="240px"
                     src="http://192.168.1.6:9001/image/registration.jpg"
                  >
                     <v-card-title>College registrations ongoing!</v-card-title>
                  </v-img>

                  <v-card-text class="text--primary">
                     <div>Accepting freshmen, transferees, ALS passers and foreign students.</div>
                  </v-card-text>
               </v-card>   
         </v-col>
         <v-col cols="12" md="4" sm="12" xs="12">
            <v-card
               class="mx-auto"
               max-width="400"
            >  
               <v-img
                  class="white--text align-end"
                  height="240px"
                  src="http://192.168.1.6:9001/image/ama_senior_high.jpg"
               >
                  <v-card-title>AMA Senior High</v-card-title>
               </v-img>

               <v-card-text class="text--primary">
                  <div>Enjot 3 days classes per week through blended learning.</div>
               </v-card-text>
            </v-card>   
        </v-col>
      <v-col cols="12" md="4" sm="12" xs="12">
            <v-card
               class="mx-auto"
               max-width="400"
            >
               <v-img
                  class="white--text align-end"
                  height="240px"
                  src="http://192.168.1.6:9001/image/foundation.jpg"
               >
                  <v-card-title>AMA Foundation Launches its donation drive</v-card-title>
               </v-img>

               <v-card-text class="text--primary">
                  <div>The men of women of AMA Education System (AMAES) headed by its Chairman, Amb. Amable R. Aguiluz and...</div>
               </v-card-text>
            </v-card>   
        </v-col>
         
    </v-row>
  </v-container>
</template>

<script>
import store from '../store';

  export default {
    data: () => ({
       windowSize: {
        x: 0,
        y: 0,
      },
      isLogged: (store.state.user == null),
      imagesNewsEvents: [
         
      ],
      colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
      slides: [
         {
            src: 'http://192.168.1.6:9001/image/richard.jpg',
            caption: "Alden Richards backs 'educational continuity' as AMA's newest Ambassador "
         },
         {
            src: 'http://192.168.1.6:9001/image/start_of_school.jpg',
            caption: "Alden Richards backs 'educational continuity' as AMA's newest Ambassador "
         },
         {
            src: 'http://192.168.1.6:9001/image/donates_face_masks.jpg',
            caption: 'COVID 19: AMA Foundation Inc. donates face masks to NRCPO frontliners'
         }
      ],
      text_size: 'display-2'
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
          this.onResize()
       },
       onResize () {
        this.windowSize = { x: window.innerWidth, y: window.innerHeight }
        if(this.windowSize.x >= 1120) {
           this.text_size = 'display-2'
        }else if(this.windowSize.x >= 890) {
           this.text_size = 'display-1'
        }else {
           this.text_size = 'title'
        }
      },
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

<style>
image {
   overflow: auto!important;
}
   .v-responsive__sizer {
      padding-bottom: 16%;
   }
</style>