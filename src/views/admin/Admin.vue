<template>
   <v-container>
      <v-row justify="center">
         <v-col xs="12">
            <v-card color="basil">
               <v-card-title class="text-center justify-center py-6 basil--text">
                  Administrator
                  <div style="width: 100%; position: absolute; right: 10px; text-align: right;">
                     <v-btn dark small fab color="primary darken-1" @click="newUserDialog = !newUserDialog">
                        <v-icon>mdi-plus</v-icon>
                     </v-btn>
                  </div>
               </v-card-title>

               <v-card-text>
                  <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
                     <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
                  </v-tabs>
                  <v-tabs-items v-model="tab">
                     <v-tab-item>
                        <professors/>
                     </v-tab-item>
                     <v-tab-item>
                        <college/>
                     </v-tab-item>
                  </v-tabs-items>
               </v-card-text>
            </v-card>
         </v-col>
      </v-row>
      <v-row>
         <v-dialog v-model="newUserDialog" persistent max-width="600px">
            <v-card>
               <v-card-title>
                  <span class="headline">New {{ ['Professor','College','Senior-High'][tab] }} Account</span>
               </v-card-title>
               <v-card-text>
                  <v-container>
                        <v-form ref="form" v-model="valid" lazy-validation>
                     <v-row>
                           <v-col cols="12" sm="6"  md="4" v-if="tab > 0">
                              <v-text-field
                                 v-model="newUser.usn"
                                 label="USN*"
                                 :rules="requiredRules"
                                 required
                              />
                           </v-col>
                           <v-col cols="12" sm="6" md="4" v-if="tab > 0">
                              <v-select
                                 v-model="newUser.level"
                                 :items="['senior-high', 'college']"
                                 label="Level*"
                                 :rules="requiredRules"
                                 required
                              ></v-select>
                           </v-col>
                           <v-col cols="12" sm="6" md="4" v-if="tab > 0">
                              <v-select
                                 v-model="newUser.year"
                                 :items="newUser.level == 'college'?[1, 2, 3, 4]:[1, 2]"
                                 label="Year*"
                                 :rules="requiredRules"
                                 required
                              ></v-select>
                           </v-col>
                           <v-col cols="12">
                              <v-text-field
                                 v-model="newUser.name"
                                 label="Name*"
                                 :rules="requiredRules"
                                 required
                              />
                           </v-col>

                           <v-col cols="12">
                              <v-text-field
                                 v-model="newUser.email"
                                 label="Email*"
                                 :rules="requiredRules"
                                 required
                              />
                           </v-col>
                     </v-row>
                        </v-form>
                  </v-container>
                  <small style="display: block;">*indicates required field</small>
                  <template v-for="(err, ir) in this.errors">
                     <small color="red" :key="ir">{{ err }}</small>
                  </template>
               </v-card-text>
               <v-card-actions>
                  <v-spacer />
                  <v-btn
                     color="blue darken-1"
                     text
                     @click="newUserDialog = false"
                  >
                     Close
                  </v-btn>
                  <v-btn
                     color="blue darken-1"
                     text
                     @click="save"
                  >
                     Save
                  </v-btn>
               </v-card-actions>
            </v-card>
         </v-dialog>
      </v-row>
   </v-container>
</template>

<script>
import Professors from '../../components/admin/Professors.vue';
import College from '../../components/admin/College.vue';
import Axios from 'axios';
// import Swal from 'sweetalert2';

export default {
   components: {
      'professors': Professors,
      'college': College
   },
   data: () => ({
      valid: true,
      errors: {},
      requiredRules: [
        v => !!v || 'required',
      ],
      tab: null,
      items: [
         'Professors', 'Students'
      ],
      newUserDialog: false,
      text: 'TEXT',
      myTab: false,
      newUser:  {
         usn: '',
         name: '',
         email: '',
         level: '',
         year: ''
      }
   }),
   computed: {

   },
   watch: {
      tab: (newTab, oldTab) => {

      }
   },
   mounted() {
      
   },
   methods: {
      save() {
         if(!this.$refs.form.validate()) return false;
         
         let tableOf = ['professor','student'];
         let user = {
            usn: this.newUser.usn,
            name: this.newUser.name,
            type: tableOf[this.tab],
            email: this.newUser.email, 
            level: this.newUser.level,
            year: this.newUser.year,
            password: 'default'
         };
         console.log('user', user);
         Axios.post(window.basePath + '/api/register', user).then(response => {
            if(response.data.registration_result == "SUCCESS") {
               this.newUserDialog = false;
               Swal.fire({
                  title: '',
                  text: 'New ' + tableOf[this.tab] + ' successfully added',
                  icon: 'success',
                  confirmButtonText: 'OK'
               })
               window.location = window.location.href
            }
         }).catch(err => {
            this.errors = err.response.data.errors;
         });
      }
   },
}
</script>