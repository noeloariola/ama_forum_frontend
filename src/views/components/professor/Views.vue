<template>
  <v-container>
    <Students v-if="$route.params.viewof == 'forum'"/>
    <Subjects v-if="$route.params.viewof == 'subjects'"/>
    <Students v-if="$route.params.viewof == 'students'"/>
    <Handouts v-if="$route.params.viewof == 'handouts'"/>
  </v-container>
</template>

<script>
import Subjects from './Subjects';
import Students from './Students';
import Handouts from './Handouts';

export default {
   components: {
      'Students': Students,
      'Subjects': Subjects,
      'Handouts': Handouts,
   },
   data: () => ({
      dialog: false,
      headers: [
         {
         text: 'Name',
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
         this.dialog = false
      },
      viewStudents(professor_id) {
         $router.push({ name: "professor-profile" })
      }
   },
}
</script>