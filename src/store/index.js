import Vue from 'vue'
import Vuex from 'vuex'
import { auth, usersCollection } from '../firebase'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userProfile: {}
  },
  mutations: {
    setLoggedInUser: function(state, user) {
      state.user = user;
    }
  },
  actions: {
    async fetchUser({ commit }, user) {
      if (user) {
        usersCollection.doc(user.uid).get().then(userDoc => {
          if (userDoc) {
            commit("setLoggedInUser",  {loggedIn: true, data: user, docData: userDoc.data() });

            if (router.name == "Sign Up" || router.name == "Sign In") {
              router.push("/");
            }
          } else {
            console.log("User doc undefined. Signing out.")
            auth.signOut();
          }
        }).catch(e => {
          console.log("Error getting user doc. Logging user out. Please try again.", e);
          auth.signOut();
        })
      } else {
        commit("setLoggedInUser", { loggedIn: false, user: null, docData: null })
      }
    }
  },
  modules: {
  }
})
