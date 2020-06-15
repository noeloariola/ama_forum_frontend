<template>
  <v-container>
    <v-row justify="center">
      <v-col sm="12" xs="12"><div style="width: 100%; position: absolute; right: 10px; text-align: right;">
            <v-btn dark small fab color="primary darken-1" @click="handoutDialog = !handoutDialog">
               <v-icon>mdi-plus</v-icon>
            </v-btn>
         </div>
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
         
      </v-col>
    </v-row>
    <v-dialog v-model="handoutDialog" persistent max-width="600px">
         <v-card>
            <v-card-title class="headline">Upload Handout</v-card-title>
            <v-card-subtitle class="mt-1">{{ loggedIn.name }} </v-card-subtitle>
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
import store from '../../../store';
export default {
   data: () => ({
      handoutDialog: false,
      selectedFiles: [],
      uploadObj: {
         level: '',
         year: '',
         files: []
      },
      list: [],
      loggedIn: {},
      active: [],
      open: [],
   }),
   mounted() {
      this.init();
   },
   methods: {
      fetchHandout(item) {
         if(item.children) return;
         
         alert(item.name)
      },
      init() {
         this.loggedIn = store.state.user

         axios.get(window.basePath + '/api/file/handouts/professor/' + this.loggedIn.id).then(res => {
            this.list = res.data.handouts
            // let keys = Object.keys(res.data.handouts);
            // let handouts = res.data.handouts;
            // this.list = [];
            // for (let i = 0; i < keys.length; i++) {

            //    let byLevels = handouts[keys[i]];
            //    console.log('byLevels', byLevels)
            //    console.log('values', Object.values(byLevels))
            //    // byLevels.forEach(function(item, index, array) {
            //    //    console.log(item)
            //    // })
            //    this.list.push({
            //       [keys[i]]: Object.values(byLevels)
            //    });
            // }
            // console.log('list', this.list)
            // console.log('response', res.data.handouts)
            console.log('item', res.data)
         }).catch(error => {
            console.log(error.response.data)
         })
      },
      addHandout(id) {
         this.handoutDialog = !this.handoutDialog;
      },
      saveHandout() {
         let formData = new FormData();
         formData.append('user_id', this.loggedIn.id);
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
               this.init()
               Swal.fire({
                     title: '',
                     text: 'New handout successfully uploaded.',
                     icon: 'success',
                     confirmButtonText: 'ok'
                  })
            }).catch(err => {
               console.log(err.response)
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
   },
}
</script>