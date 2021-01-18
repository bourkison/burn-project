import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
      apiKey: "AIzaSyD34Lvj0Q-Wm0o9CULDKXucRw_eLSnPnBE",
      authDomain: "burn-project-f8493.firebaseapp.com",
      projectId: "burn-project-f8493",
      storageBucket: "burn-project-f8493.appspot.com",
      messagingSenderId: "737450034110",
      appId: "1:737450034110:web:c526ade8c43730adf02fef",
      measurementId: "G-P5MMTY71BB"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  },
}).$mount('#app')
