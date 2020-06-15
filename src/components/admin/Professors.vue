<template>
  <v-container>
    <v-row justify="center">
      <v-col sm="12" xs="12">
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
          <template v-slot:item.name="{ item }">
            <span>{{ item.name }}</span>
          </template>
          <template v-slot:item.id="{ item }">
            <v-btn icon>
              <v-icon
                v-model="item.id"
                icon
                small
                color="warning"
                @click="formAction('edit', item.id)"
              >
                mdi-pencil
              </v-icon>
            </v-btn>
            
            <!-- <v-btn icon>
               <v-icon
                  v-model="item.id"
                  icon
                  small
                  color="error"
                  @click="formAction('new-handout', item.id)"
               >
                  mdi-file
               </v-icon>
            </v-btn> -->

            <v-btn icon>
              <v-icon
                v-model="item.id"
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
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="formObject.name"
                  label="First Name*"
                  required
                />
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="formObject.email"
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
            @click="dialog = false"
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
      <v-dialog v-model="handoutDialog" persistent max-width="600px">
         <v-card>
            <v-card-title class="headline">Upload Handout</v-card-title>
            <v-card-subtitle class="mt-1"> {{ formObject.name }} </v-card-subtitle>
            <v-card-text>
               <v-container>
                  <v-row>
                     <v-col cols="12" sm="6" md="4">
                        <v-select
                           v-model="uploadObj.level"
                           :items="['senior-high', 'college']"
                           label="Level*"
                        ></v-select>
                     </v-col>
                     <v-col cols="12" md="6" sm="12">
                        <v-select
                           v-model="uploadObj.year"
                           :items="uploadObj.level == 'college'?[1, 2, 3, 4]:[1, 2]"
                           label="Year*"
                        ></v-select>
                     </v-col>
                     <v-col>
                        <v-file-input v-model="selectedFiles" label="File input" placeholder="Select your files" show-size prepend-icon="mdi-paperclip" counter multiple></v-file-input>
                     </v-col>
                  </v-row>
               </v-container>
               
               
            </v-card-text>
            <v-card-actions>
               <v-spacer />
               <v-btn olor="blue darken-1" text
                  @click="handoutDialog = false"
               >
                  Close
               </v-btn>
               <v-btn color="blue darken-1" text
                  @click="saveHandout"
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
      handoutDialog: false,
      headers: [
         {
         text: 'Name',
         align: 'start',
         sortable: false,
         value: 'name',
         },
         { text: 'email', value: 'email' },
         { text: 'Action', value: 'id'}
      ],
      list: [],
      selectedFiles: [],
      formObject: {
         id: '',
         name: '',
         email: '',
         password: '',
         classification: '',
      },
      uploadObj: {
         user_id: '',
         level: '',
         year: '',
         files: []
      },
      search_field: ''
   }),
   computed: {
      fullName: function() {
         return this.formObject.first_name.concat(' ', this.formObject.middle_name) + ' ' + this.formObject.last_name
      }
   },
   watch: {
      options: {
        handler () {
          this.getDataFromApi()
            .then(data => {
              this.desserts = data.items
              this.totalDesserts = data.total
            })
        },
        deep: true,
      },
    },
   mounted() {
      this.init();
   },
   methods: {
      init() {
         axios.get(window.basePath + '/api/list/professor').then(res => {
            this.list = res.data.list;
            console.log('response', res.data)
         });
      },
      formAction(action, id) {
         switch (action) {
            case 'add':
               this.add()
               break;
            case 'edit':
               this.edit(id)
               break;
            case 'new-handout':
               this.addHandout(id)
               break;
            case 'delete':
               this.delete(id)
               break;
         
            default:
               return;
               break;
         }
      },
      add() {

      },
      edit(id) {
         const professor = this.list.find(item => item.id == id);

         Object.assign(this.formObject, professor);
         this.dialog = !this.dialog
      },
      addHandout(id) {
         const professor = this.list.find(item => item.id == id);
         Object.assign(this.formObject, professor);
         console.log('ob', this.formObject)
         this.handoutDialog = !this.handoutDialog;
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
      save() {
         let itemIndex = this.list.findIndex(item => item.id == this.formObject.id);
         Object.assign(this.list[itemIndex], this.formObject);

         Axios.post(window.basePath + '/api/account/update', this.formObject).then(response => {
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
      saveHandout(){
         let formData = new FormData();
         formData.append('user_id', this.formObject.id);
         formData.append('level', this.uploadObj.level);
         formData.append('year', this.uploadObj.year);

         for( var i = 0; i < this.selectedFiles.length; i++ ){
            let file = this.selectedFiles[i];
            formData.append('handouts[' + i + ']', file);
         }
         axios.post(
            window.basePath + '/api/file/handouts', 
            formData,
            {
               headers: {
                  'Content-Type': 'multipart/form-data'
               }
            }
            ).then(res => {
               alert('huwooo')
               console.log(res.data)
            }).catch(err => {
               console.log(err.response)
            })
      },
      viewStudents(professor_id) {
         $router.push({ name: "professor-profile" })
      },
      searchProf() {
         axios.get(window.basePath + '/api/list/professor?model=professor&searchName=' + this.search_field).then(res => {
            this.list = res.data.list;
            console.log('response', res.data)
         });
      }
   },
}
</script>