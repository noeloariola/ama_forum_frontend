<template>
  <v-container>
    <v-row justify="center" align="center">
         <v-col cols="12" lg="6" md="4" sm="12" xs="12">
                  <v-img aspect-ratio="1.7" contain
                                 :src="'http://192.168.1.10:9001/image/home_pic.png'"
                              ></v-img>
               </v-col>
      <v-col
        md="4"
        sm="6"
        xs="12"
        align="end"
      >
         <v-card class="mx-auto" shaped>
            <v-card-title color="primary">Login
               <!-- <v-toolbar dense>
                  <v-toolbar-title color="#385F73">Login</v-toolbar-title>
               </v-toolbar> -->
            </v-card-title>
            <v-card-text>
               <v-form ref="form" v-model="valid" :lazy-validation="lazy" >
                  <v-text-field v-model="usn" label="Email / USN" required/>
                  <v-text-field
                     v-model="password"
                     :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                     :type="showPassword ? 'text' : 'password'"
                     label="Password"
                     value="wqfasds"
                     class="input-group--focused"
                     @click:append="showPassword = !showPassword"
                  />
                  <!-- <v-btn x-small text> Register </v-btn> -->
                  <v-btn x-small text @click="forgotDialogIsOPen = !forgotDialogIsOPen"> Forgot password </v-btn>
                  <v-btn color="red darken-4" dark @click="login"> Submit </v-btn>
               </v-form>
            </v-card-text>
         
         </v-card>
         
      </v-col>
    </v-row>
      <v-dialog v-model="forgotDialogIsOPen" max-width="600px">
         <v-progress-linear
            indeterminate
            color="red darken-2"
            :active="password_requesting"
         ></v-progress-linear>
         <v-card>
            <v-card-title>
               <span class="headline">Forgot Password</span>
            </v-card-title>
            <v-card-text>
               <v-text-field 
               v-model="forgotEmail" 
               label="Email address*" 
               hint="please enter your email address above"
               persistent-hint
               append-icon="mdi-send"
               @click:append="requestPassword"
               @keyup.enter="requestPassword" 
               required></v-text-field>
            </v-card-text>
         </v-card>
    </v-dialog>
  </v-container>
</template>

<script>

import store from '../store';
// import Swal from 'sweetalert2';

export default {
   data: () => ({
      valid: true,
      lazy: false,
      usn: '',
      password: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      showPassword: false,
      passwordRules: {
         required: value => !!value || 'Required.',
         min: v => v.length >= 8 || 'Min 8 characters',
         usnMatch: () => ('The usn and password you entered don\'t match')
      },
      forgotDialogIsOPen: false,
      forgotEmail: '',
      query: false,
      password_requesting: false,
   }),
   mounted() {

   },
   methods: {
      requestPassword() {
         this.password_requesting = true;
         this.newPassword().then(res => {
            this.password_requesting = false;
            if(res.data.status == 'success') {
               this.forgotDialogIsOPen = false;
               Swal.fire({
                  title: '',
                  text: 'Your new password was sent to your email...',
                  icon: 'success',
                  confirmButtonText: 'OK'
               })
            }else {
               Swal.fire({
                  title: '',
                  text: res.data.error,
                  icon: 'error',
                  confirmButtonText: 'OK'
               })
            }
         })
         
      },
      async newPassword() {
         let res = await axios.post(window.basePath + '/api/change_password', { email: this.forgotEmail}).then(res => {
            // if(res.data.status == 'success') {
            //    this.forgotDialogIsOPen = false;
            //    Swal.fire({
            //       title: '',
            //       text: 'Your new password was sent to your email...',
            //       icon: 'success',
            //       confirmButtonText: 'OK'
            //    })
               return res;
            // }
         }).catch(err => {
            Swal.fire({
                  title: '',
                  text: 'Requesting a new password failed',
                  icon: 'error',
                  confirmButtonText: 'OK'
               })
         });
         return res;
      },
      login() {
         axios.post(window.basePath + '/api/login', { usn: this.usn, password: this.password}).then(res => {
            if(res.data.login == 'FAILED') {
               Swal.fire({ title: '', text: 'Login failed', icon: 'error', confirmButtonText: 'Cool' });
               return true;
            }
            this.$store.commit("setAccount", res.data.account);
            this.$emit("logged", res.data.account);
            window.setTokenExchangingOption(res.data.accessToken);
            this.$router.push({name: 'welcome'});
         }).catch(err => {
            console.log(err.response.data)
         });
      },
   },
   computed: {
      user: {
         get() {
            return this.store.state.user;
         }, 
         set: val => {
            return (this.store.state.user = val);
         }
      }
   },
}
</script>