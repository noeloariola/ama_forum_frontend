<template>
  <v-container>
    <v-row justify="center">
      <v-col xs="12">
        <v-data-table
          :headers="headers"
          :items="desserts"
          :items-per-page="5"
          hide-default-footer
          class="elevation-1"
        >
          <template v-slot:item.first_name="{ item }">
            <span>{{ item.first_name.concat(' ', item.middle_name) + ' ' + item.last_name }}</span>
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
            <v-btn icon>
              <v-icon
                v-model="item.id"
                icon
                small
                color="primary"
                @click="viewStudents(item.id)"
              >
                mdi-account-group
              </v-icon>
            </v-btn>
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
export default {
   data: () => ({
      dialog: false,
      headers: [
         {
         text: 'Subject Name',
         align: 'start',
         sortable: false,
         value: 'first_name',
         },
         { text: 'email', value: 'email' },
         { text: 'Action', value: 'id'}
      ],
      desserts: [
         {
            id: 1,
            first_name: 'Professor',
            middle_name: 'Name',
            last_name: '1',
            email: 'sample@gmail.com',
            classification: 'Professor',
         },
         {
            id: 2,
            first_name: 'Professor',
            middle_name: '',
            last_name: '2',
            email: 'sample@gmail.com',
            classification: 'Professor',
         },
         {
            id: 3,
            first_name: 'Professor',
            middle_name: 'Name',
            last_name: '3',
            email: 'sample@gmail.com',
            classification: 'Professor',
         },
         {
         id: 4,
            first_name: 'Professor',
            middle_name: 'Name',
            last_name: '4',
            email: 'sample@gmail.com',
            classification: 'Professor',
         },
         {
            id: 5,
            first_name: 'Professor',
            middle_name: 'Name',
            last_name: '5',
            email: 'sample@gmail.com',
            classification: 'Professor',
         }
      ],
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
   methods: {
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
         const professor = this.desserts.find(item => item.id == id);
         Object.assign(this.formObject, professor);
         this.dialog = !this.dialog
      },
      delete(id){

      },
      save() {
         let itemIndex = this.desserts.findIndex(item => item.id == this.formObject.id);
         Object.assign(this.desserts[itemIndex], this.formObject);
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
   beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
    console.log(to);
    console.log(from);
  }
}
</script>