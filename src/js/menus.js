let student = [
    {
        no: 1,
        label: 'Home',
        routeName: 'welcome',
        param: { },   
        icon: 'dashboard',
        style: {

        }
     },
     {
        no: 2,
        label: 'Forum',
        routeName: 'forum',
        param: { },   
        icon: 'dashboard',
        style: {

        }
     },
     {
        no: 3,
        label: 'Professors',
        routeName: 's-professors',
        param: { },   
        icon: 'dashboard',
        style: {

        }
     },
     {
         no: 4,
         label: 'News and Events',
         routeName: 'news_events',
         param: { },   
         icon: 'dashboard',
         style: {
 
         }
      },
     {
         no: 5,
         label: 'About',
         routeName: 'about',
         param: {},
         icon: 'dashboard',
         style: {
  
         }
     },
];

let professor = [
   
   {
      no: 1,
      label: 'Forum',
       routeName: 'forum',
       param: { },   
       icon: 'dashboard',
       style: {

       }
   },
//    {
//        no: 2,
//        label: 'Subjects',
//        routeName: 'professor-viewof',
//        param: { viewof: 'subjects' },
//        icon: 'dashboard',
//        style: {

//        }
//    },
//    {
//        no: 3,
//        label: 'Students',
//        routeName: 'professor-viewof',
//        param: { viewof: 'students' },
//        icon: 'dashboard',
//        style: {

//        }
//    },
   {
       no: 2,
       label: 'Handouts',
       routeName: 'professor-viewof',
       param: { viewof: 'handouts' },
       icon: 'dashboard',
       style: {

       }
   },
   {
       no: 3,
       label: 'News and Events',
       routeName: 'news_events',
       param: { },   
       icon: 'dashboard',
       style: {

       }
    },
    {
       no: 4,
       label: 'About',
       routeName: 'about',
       param: {},
       icon: 'dashboard',
       style: {

       }
    },
];

let admin = [
    {
        no: 1,
        label: 'Home',
         routeName: 'welcome',
         param: { },   
         icon: 'dashboard',
         style: {
  
         }
     },
     {
        no: 2,
        label: 'Maintenance',
        routeName: 'admin',
        param: { },   
        icon: 'dashboard',
        style: {

        }
     },
     {
         no: 3,
         label: 'News and Events',
         routeName: 'news_events',
         param: { },   
         icon: 'dashboard',
         style: {
 
         }
      },
      {
         no: 4,
         label: 'About',
         routeName: 'about',
         param: {},
         icon: 'dashboard',
         style: {
  
         }
      },
];
// function menus(user, allowedRoles) {
//     let content = { sidebarMenus: null};
//     if(user) {
//         if (isAuthorize(user.type, allowedRoles)) {
//             content.sidebarMenus = getLayout(user.type);
//             return content;
//         }
//     }      
//     return false;
// }
function menus(user) {
   if (user) {
       return getLayout(user.type)
   }
   return false;
}
function getLayout(role) {
   switch (role) {
       case 'student':
           return student;
       case 'professor':
           return professor;
       case 'admin':
           return admin;
       default:
           return [];
   }
   // return role == 'super_admin'? adminMenu:defaultMenu;
}

function isAuthorize(user_role, roles) {
   let isAllowed = roles.find(function (role) {
       return user_role == role;
   });
   if (isAllowed) return true
   return false;
}


export default { menus }

