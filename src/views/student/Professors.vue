<template>
  <v-container>
    <v-row justify="center">
       <v-col cols="12" md="6" sm="6" xs="8">
            <v-text-field
               v-model="searchName"
               label="Name"
               placeholder="Search name"
               prepend-icon="mdi-refresh"
               append-icon="mdi-send"
               @click:prepend="init()"
               @click:append="searchAccount"
               required
            />
       </v-col>

      <v-col sm="12" xs="12">
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
               <router-link 
               v-model="item.id"
                  tag="v-icon"
                  small
                  color="primary"
                  :to="{ name: 's-prof-handouts', params: { id: item.id}}">
                  mdi-folder
               </router-link>
              
            </v-btn>
          </template>
        </v-data-table>
      </v-col>

    </v-row>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="formObject.first_name"
                  label="First Name*"
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="formObject.middle_name"
                  label="Middle Name"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="formObject.last_name"
                  label="Last Name*"
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
  </v-container>
</template>

<script>
import Axios from 'axios'
export default {
   data: () => ({
      dialog: false,
      headers: [
         {
         text: 'Name',
         align: 'start',
         value: 'name',
         },
         { text: 'email', value: 'email' },
         { text: 'View Handouts', sortable: false, value: 'id'}
      ],
      list: [],
      formObject: {
         id: '',
         first_name: '',
         middle_name: '',
         last_name: '',
         email: '',
         password: '',
         classification: '',
      },
      searchName: '',
   }),
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
         //  axios.get(window.basePath + '/api/download/handout/11', {responseType: 'stream'},
         //    {
         //       headers: {
         //          'Accept': 'multipart/form-datatext/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
         //          responseType: 'stream'
         //       }
         //    }
         //  ).then(res => {
         //    console.log('file', res)
         // });
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
      delete(id){

      },
      save() {
         let itemIndex = this.list.findIndex(item => item.id == this.formObject.id);
         Object.assign(this.list[itemIndex], this.formObject);
         // this.desserts.forEach(item => {
         //    if(item.id == this.formObject.id) {
         //       item = this.formObject
         //    }
         //    console.log('formObject', this.formObject)
         // })
         this.dialog = false
      },
      viewStudents(professor_id) {
         $router.push({ name: "professor-profile" })
      },
      searchAccount() {
         axios.get(window.basePath + '/api/list/professor', {params: { searchName: this.searchName }}).then(res => {
            this.list = res.data.list;
            console.log('searched', res.data)
         });
      }
   },
}
</script>