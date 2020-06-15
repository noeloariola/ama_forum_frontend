<template>
   <v-container>
      <v-row class="text-center">
         <v-col cols="12">
         <template v-for="(thread, i) in list">
            <v-card class="mx-auto mb-12 pb-4" :key="'pst-' + thread.id">
               
               <v-list-item class="text-left">
               <v-list-item-avatar color="red">
                  <v-icon color="white"
                  v-text="'mdi-alpha-' + thread.type[0]"
               ></v-icon>
               </v-list-item-avatar>
               <v-list-item-content>
                  <v-list-item-title class="headline">
                     {{ thread.title }}
                  </v-list-item-title>
                  <v-list-item-subtitle>{{ thread.poster_name }}</v-list-item-subtitle>
               </v-list-item-content>
               </v-list-item>

               <v-card-text class="text-left">
               <div style="background-color: #E0F2F1; border-radius: 14px; padding: 12px;">
                  {{ thread.message }}
               </div>
               </v-card-text>

               <v-card-actions>

               <v-spacer />
               <v-btn text small color="deep-purple accent-4" @click="openThreadForm('comment', i)"> comment </v-btn>

               </v-card-actions>
               <v-divider />

               <v-card class="ml-10" elevation="0">
                  <template v-for="(comment, ci) in thread.comments">
                     <div :key="'ci-' + comment.id">
                        <v-list-item class="text-left">
                        <v-list-item-avatar color="red">
                           <v-icon color="white"
                           v-text="'mdi-alpha-' + comment.type[0]"
                        ></v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                           <!-- <v-list-item-title class="headline">Our Changing Planet</v-list-item-title> -->
                           <v-list-item-subtitle>{{ comment.commentor_name }}</v-list-item-subtitle>
                        </v-list-item-content>
                     </v-list-item>
                     <v-card-text class="text-left">
                        <div style="background-color: #E0F2F1; border-radius: 14px; padding: 12px;">
                           {{ comment.message }}
                        </div>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer />
                        <v-btn text small color="deep-purple accent-4" @click="openThreadForm('reply', i, ci)"> reply </v-btn>
                     </v-card-actions>
                     </div>

                     <template v-for="reply in comment.replies">
                        <v-card class="ml-10" elevation="0" :key="'ri-' + reply.id">
                           <v-list-item class="text-left">
                              <v-list-item-avatar color="red">
                                 <v-icon color="white"
                                 v-text="'mdi-alpha-' + comment.type[0]"
                              ></v-icon>
                              </v-list-item-avatar>
                              <v-list-item-content>
                              <!-- <v-list-item-title class="headline">Our Changing Planet</v-list-item-title> -->
                              <v-list-item-subtitle>{{ reply.replier_name }}</v-list-item-subtitle>
                              </v-list-item-content>
                           </v-list-item>
                           <v-card-text class="text-left">
                              <div style="background-color: #E0F2F1; border-radius: 14px; padding: 12px;">
                                 {{ reply.message }}
                              </div>
                           </v-card-text>
                           <v-card-actions>
                              <v-spacer />
                           </v-card-actions>
                        </v-card>
                     </template>
                     
                  </template>
               </v-card>
            </v-card>
         </template>
         <v-btn fixed dark bottom right fab color="primary darken-1" @click="openThreadForm('post', 0)">
               <v-icon>mdi-plus</v-icon>
            </v-btn>
         </v-col>
      </v-row>
      
      <v-dialog v-model="newPostDialog" persistent max-width="600px">
               <v-card>
                  <v-card-title>
                     <span class="headline">{{ formTitle[formOf] }}</span>
                  </v-card-title>
                  <v-card-text>
                     <v-container>
                        <v-row>
                           <v-col cols="12" md="12" sm="6">
                              <v-text-field
                                 v-if="formOf == 'post'"
                                 clearable
                                 clear-icon="mdi-close"
                                 v-model="tempPost.title"
                                 label="Title"
                                 required
                              />
                              <v-textarea
                                 clearable
                                 clear-icon="mdi-close"
                                 label="Message"
                                 v-model="tempPost.message"
                                 required
                              />
                           </v-col>
                        </v-row>
                     </v-container>
                  </v-card-text>
                  <v-card-actions>
                     <v-spacer />
                     <v-btn color="blue darken-1" text @click="newPostDialog = false"> Close </v-btn>
                     <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                  </v-card-actions>
               </v-card>
            </v-dialog>
   </v-container>
</template>

<script>
   export default {
      data: () => ({
         list: [],
         formOf: 'post',
         formTitle: {
            post: 'New Thread',
            comment: 'Comment',
            reply: 'Reply'
         },
         newPostDialog: false,
         tempPost: {
            table: '',
            title: '',
            message: '',
            post_id: '',
            comment_id: ''
         },
         threadIndex: []
      }),
      mounted() {
         this.init()
      },
      methods: {
         init() {
            axios.get(window.basePath + '/api/forum/post', this.tempPost, {withCredentials: true}).then(res => {
               this.list = res.data.posts
               console.log(this.list)
            }).catch(err => {
               console.log(err.response.data)
            })
         },
         openThreadForm(formOf, ...thread) {
            this.newPostDialog = !this.newPostDialog
            this.formOf = formOf;
            this.threadIndex = thread;
            this.tempPost.post_id = formOf == 'comment'?this.list[thread[0]].id:''
            this.tempPost.comment_id = formOf == 'reply'?this.list[thread[0]].comments[thread[1]].id:''
         },
         saveCommentOrReply() {
            
         },
         save() { 
            let data = {};
            this.tempPost.table = this.tableName(this.formOf);
            data.title = this.tempPost.title;
            data.message = this.tempPost.message;

            axios.post(window.basePath + '/api/forum/post', this.tempPost).then(res => {
               if(res.data.THREAD_UPDATE == 'SUCCESS') {
                  this.newPostDialog = false
                  let alertMsg = '';
                  if(this.formOf == 'post') {
                     // this.list.unshift(res.data.new_item);
                     alertMsg = 'Posting successful';
                  }else if(this.formOf == 'comment') {
                     // this.list[this.threadIndex[0]].comments.unshift(res.data.new_item)
                     alertMsg = 'Commenting successfull'
                  }else if(this.formOf == 'reply') {
                     // this.list[this.threadIndex[0]].comments[this.threadIndex[1]].replies.unshift(res.data.new_item);
                     alertMsg = 'Replied successfull'
                  }
                  this.clearForm()
                  this.newPostDialog = false;
                  this.init()
                  Swal.fire({
                     title: '',
                     text: alertMsg,
                     icon: 'success',
                     confirmButtonText: 'ok'
                  })
               }
                  
            }).catch(err => {
               console.log(err.response)
            })
            // alert('saving...')
         },
         tableName(param) {
            switch (param) {
               case 'post':
                  return 'posts';
               case 'comment':
                  return 'comments';
               case 'reply':
                  return 'replies';
               default:
                  return;
            }
         },
         clearForm(){
            Object.assign(this.tempPost, {
               table: '',
               title: '',
               message: '',
               post_id: '',
               comment_id: ''
            })
         }
      },
      computed: {
         computedList: {
            get() {
               return this.list;
            }, 
            set: val => {
               return (this.list = val);
            }
         }
      }
   }
</script>

<style scoped>
   .v-card__actions {
      padding: 0;
   }
   .v-card__subtitle, .v-card__text, .v-card__title {
      padding: 0px 16px 0px 16px;
   }
</style>

