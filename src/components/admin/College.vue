<template>
  <v-container>
    <v-row justify="center">
      <v-col xs="12">
         <v-card>
            <v-card-title>
            
            <v-spacer></v-spacer>
            <v-text-field
               prepend-icon="mdi-refresh"
               append-icon="mdi-magnify"
               label="Search"
               single-line
               hide-details
               v-model="search_field"
               @click:append="searchProf"
               @keyup.enter="searchProf" 
               @click:prepend="init()"
            />
         </v-card-title>

         <v-data-table
            :headers="headers"
            :items="list"
            :items-per-page="5"
            class="elevation-1"
         >
            <!-- <template v-slot:item.name="{ item }">
               <span>{{ item.name }}</span>
            </template>
            <template v-slot:item.student_info="{ item }">
               <span>{{ item.student_info.level }}</span>
            </template> -->
            <template v-slot:item.id="{ item }">
               <v-btn icon>
               <v-icon
                  icon
                  small
                  color="warning"
                  @click="formAction('edit', item.id)"
               >
                  mdi-pencil
               </v-icon>
               </v-btn>

               <v-btn icon>
               <v-icon
                  icon
                  small
                  color="error"
                  @click="formAction('delete', item.id)"
               >
                  mdi-delete
               </v-icon>
               </v-btn>
            </template>
         </v-data-table>
         </v-card>
      </v-col>
    </v-row>
      <v-dialog v-model="dialog" persistent max-width="600px">
         <v-card>
         <v-card-title>
            <span class="headline">User Profile</span>
         </v-card-title>
         <v-card-text>
            <v-container>
               <v-row>
                  <v-col cols="12" sm="6"  md="4">
                     <v-text-field
                        v-model="defaultObject.usn"
                        label="USN*"
                        required
                     />
                  </v-col>
                  
                  <v-col cols="12" sm="6" md="4">
                     <v-select
                        v-model="defaultObject.level"
                        :items="['senior-high', 'college']"
                        label="Level*"
                     ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                     <v-select
                        v-model="defaultObject.year"
                        :items="defaultObject.level == 'college'?[1, 2, 3, 4]:[1, 2]"
                        label="Year*"
                     ></v-select>
                  </v-col>

                  <v-col cols="12">
                     <v-text-field
                        v-model="defaultObject.name"
                        label="Name*"
                        required
                     />
                  </v-col>
                  
                  <v-col cols="12">
                     <v-text-field
                        v-model="defaultObject.email"
                        label="Email*"
                        required
                     />
                  </v-col>
               </v-row>
            </v-container>
            <small>*indicates required field</small>
         </v-card-text>
         <v-card-actions>
            <v-spacer />
            <v-btn
               color="blue darken-1"
               text
               @click="save"
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
   </v-container>
</template>

<script>
import Axios from 'axios'
export default {
   data: () => ({
      dialog: false,
      headers: [
         {
            text: 'USN',
            align: 'start',
            sortable: false,
            value: 'usn',
         },
         { text: 'NAME', value: 'name' },
         { text: 'LEVEL', value: 'level' },
         { text: 'YEAR', value: 'year' },
         { text: 'Action', value: 'id'}
      ],
      defaultObject: {
         usn: '',
         name: '',
         email: '',
         level: '',
         year: ''
      },
      selectedStudent: {
         id: '',
         name: '',
         type: '',
         email: '',
         email_verified_at: '',
         created_at: '',
         updated_at: '',
         student_info: {
            usn: '',
            level: '',
            year: ''
         }
      },
      list: [],
      search_field: ''
   }),
   mounted() {
      this.init();
   },
   methods: {
      init() {
         axios.get(window.basePath + '/api/list/student').then(res => {
            this.list = res.data.list;
            console.log('college', res.data.list)
         });
      },
      formAction(action, id) {
         switch (action) {
            case 'add':
               
               break;
            case 'edit':
               this.edit(id);
               break;
            case 'delete':
               this.delete(id);
               break;
            default:
               return;
               break;
         }
      },
      add() {

      },
      edit(id) {
         this.dialog = !this.dialog
         const result = this.list.find(item => item.id == id);
         this.defaultObject.id = result.id;
         this.defaultObject.usn = result.usn;
         this.defaultObject.name = result.name;
         this.defaultObject.email = result.email;
         this.defaultObject.level = result.level;
         this.defaultObject.year = result.year;
         // Object.assign(this.defaultObject, result);
         // this.defaultObject.usn: '',
         // this.defaultObject.name: '',
         // this.defaultObject.email: '',
         // this.defaultObject.level: '',
         // this.defaultObject.year: ''
      },
      delete(id){
         axios.post(
            window.basePath + '/api/account/delete', { id: id }
         ).then(res => {
            if(res.data.STATUS == 'SUCCESS') {
               Swal.fire({
                  title: '',
                  text: 'Account successfully deleted',
                  icon: 'warning',
                  confirmButtonText: 'ok'
               })
               this.init()
            }
         }).catch(err => {
            console.log(err.response)
         })
      },
      searchProf() {
         axios.get(window.basePath + '/api/list/student?model=student&searchName=' + this.search_field).then(res => {
            this.list = res.data.list;
            console.log('response', res.data)
         });
      },
      save() {
         let itemIndex = this.list.findIndex(item => item.id == this.defaultObject.id);
         Object.assign(this.list[itemIndex], this.defaultObject);

         Axios.post(window.basePath + '/api/account/update', this.defaultObject).then(response => {
            if(response.data.update_result == "SUCCESS") {
               this.dialog = false
               Swal.fire({
                  title: '',
                  text: 'User successfully updated',
                  icon: 'success',
                  confirmButtonText: 'OK'
               }).then((res) => {
                  window.location = window.location.href
               })
               
            }
         }).catch(err => {
            this.errors = err.response.data.errors;
         });
      },
   }
}
</script>