<template>
  <v-container>
    <v-row justify="center">
      <v-col sm="12" xs="12">
        <v-treeview
            :active.sync="active"
            :items="list"
            :load-children="fetchHandout"
            :open.sync="open"
            shaped
            hoverable
            color="warning"
            open-on-click
            transition
         >
            <template slot="label" slot-scope="{ item }">
               <a v-if="!item.children" @click="fetchHandout(item)">{{ item.name }}</a>
               <span v-else>{{ item.name }}</span>
            </template>
         </v-treeview>
         <h5 v-if="list.length <= 0">No handouts available</h5>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Axios from 'axios'
import store from '../../store';
import router from '../../router';
export default {
   data: () => ({
      handoutDialog: false,
      dialog: false,
      list: [],
      open: [],
      active: [],
      formObject: {
         id: '',
         first_name: '',
         middle_name: '',
         last_name: '',
         email: '',
         password: '',
         classification: '',
      }
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
      fetchHandout(item) {
         if(item.children) return;
         window.open(window.basePath + '/download/handout?prof_id=' + item.id +'&file='+ item.path,'_blank');
      },
      init() {
         this.loggedIn = store.state.user
         axios.get(window.basePath + '/api/file/handouts/professor/' + router.currentRoute.params.id).then(res => {
            this.list = res.data.handouts
         }).catch(error => {
            console.log(error.response.data)
         })
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
   },
}
</script>