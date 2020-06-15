<template>
  <v-container>
    <v-row justify="center">
      <v-col xs="12">
        <v-simple-table
          fixed-header
          height="300px"
        >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Calories
                </th>
                <th class="text-center">
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in list"
                :key="item.name"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.year }}</td>
                <td class="text-center">
                  <v-btn
                    icon
                    small
                    color="pink"
                    @click="formAction('edit')"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    small
                    color="pink"
                    @click="formAction('delete')"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
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
                  label="First Name*"
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field label="Middle Name" />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Last Name*"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['Professor', 'College', 'Senior High']"
                  label="Classification*"
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
            @click="dialog = false"
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
      list: [],
   }),
   methods: {
      init() {
         axios.get(window.basePath + '/api/list/senior-high').then(res => {
            this.list = res.data.list;
         });
      },
      formAction(action) {
         switch (action) {
            case 'add':
               
               break;
            case 'edit':
               
               break;
            case 'delete':
               
               break;
         
            default:
               return;
               break;
         }
         this.dialog = !this.dialog
      },
      add() {

      },
      edit(id) {

      },
      delete(id){
         
      }
   }
}
</script>