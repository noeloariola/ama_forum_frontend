import Vue from 'vue';
import App from './App.vue';
import vuetify from '@/plugins/vuetify';
import router from './router';
import store from './store';
Vue.config.productionTip = false;

window.basePath = 'http://192.168.1.6:9001';

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.Swal = require('sweetalert2');

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

window.setTokenExchangingOption = function(accessToken) {
  if(process.env.NODE_ENV == 'development') {
    if(getCookie("accessToken") == '') setCookie("accessToken", accessToken);
     window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
     return true;
  } return false;
} 

async function loadProfile() {
  try{
    window.setTokenExchangingOption(getCookie('accessToken'));

     let res = await axios.get(window.basePath + '/api/my_profile')
                    .then(result => {
                      store.commit("setAccount", result.data.account);
                    }).catch(err => {console.log('catch', err )})
     return res;
  }catch(err) {
      console.log('tryCatch', err)
  }
}
loadProfile().then(res => {
    Vue.config.productionTip = false
    const app = new Vue({
      vuetify,
      router,
      store,
      render: h => h(App)
    }).$mount('#vue');
})

