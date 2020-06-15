<template>
   <v-container fluid>
      <v-row justify="center" align="center">
         <div class="text-center">
            <div class="title">
               AMA FORUM
            </div>

            <div>
               AMA University is a member of the AMA Education System and the first in IT education and full online education in the Philippines.
            </div>
         </div>
         <div>
            <v-item-group>
            <v-container align="center" class="text-center">
               <v-row>
                  <v-col
                     v-for="circle in circles"
                     :key="circle.title"
                     cols="12"
                     md="4"
                     >
                        <v-item>
                           <v-card class="align-center" flat>
                              <v-card-text>
                                 <v-img aspect-ratio="1.7" contain
                                 :src="circle.image"
                              ></v-img>
                              </v-card-text>
                              <v-card-subtitle>{{circle.title}}</v-card-subtitle>
                              <v-card-text>
                                 {{circle.text}}
                              </v-card-text>
                           </v-card>
                        </v-item>
                     </v-col>
                  </v-row>
               </v-container>
            </v-item-group>
         </div>
      </v-row>

      <v-footer
         padless
      >
         <v-card
            flat
            tile
            class="text-center flex"
         >
            <v-card-title class="">
               <v-col cols="12" lg="2" md="2" sm="12" xs="12">
                  <v-img aspect-ratio="1.7" contain
                                 :src="'http://192.168.1.6:9001/image/ama_logo.png'"
                              ></v-img>
               </v-col>
               
                
               <strong class="subheading">Get connected with us on social networks!</strong>
               <v-spacer></v-spacer>
               <a class="plain mx-4" href="https://www.facebook.com/amauniversityandcolleges/" target="_blank">
                  <v-icon large color="blue darken-2">mdi-facebook</v-icon>
               </a>
               <a class="plain mx-4" href="https://www.youtube.com/user/AMAESOfficial/" target="_blank">
                  <v-icon large color="red darken-2">mdi-youtube</v-icon>
               </a>
               <a class="plain mx-4" href="https://www.linkedin.com/company/ama-education-system" target="_blank">
                  <v-icon large color="blue lighten-1">mdi-twitter</v-icon>
               </a>
               <a class="plain mx-4" href="https://www.linkedin.com/company/ama-education-system" target="_blank">
                  <v-icon large color="blue darken-1" a>mdi-linkedin</v-icon>
               </a>
               <a class="plain mx-4" href="http://instagram.com/amaeducsystem" target="_blank">
                  <v-icon large color="pink lighten-2" a>mdi-instagram</v-icon>
               </a>
               <a class="plain mx-4" href="https://www.youtube.com/user/AMAESOfficial/" target="_blank">
                  <v-icon large color="red darken-2" a>mdi-youtube</v-icon>
               </a>

            </v-card-title>

            <v-card-text class="py-2 black--text text-center">
               {{ new Date().getFullYear() }} — <strong>AMA Programmers</strong>
            </v-card-text>

         </v-card>
      </v-footer>
   </v-container>
</template>


<script>
export default {
   data: () => ({
      circles: [
         {
            title: '',
            image: 'http://192.168.1.6:9001/image/campus.jpg',
            text: 'ISO 9001:2008 Certified for all programs; Recognized as Center of Development in Information Technology by CHED…'
         },
         {
            title: 'Vision and Mission',
            image: 'http://192.168.1.6:9001/image/our_reputation.jpg',
            text: 'AMA will be the leader and dominant provider of relevant globally recognized information technology-based education and related services in the global market…'
         },
         {
            title: 'Inside the Campus',
            image: 'http://192.168.1.6:9001/image/vision_mission.jpg',
            text: 'College buildings, gymnasium, audio visual room, super lab..'
         },
      ]
   })
}
</script>
<style scoped>
   .plain {
      text-decoration: none;
      text-decoration-line: none;
   }
</style>