import Vue from 'vue'
import Vuex from 'vuex'
import { auth, userCollection } from '../firebase'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userProfile: { loggedIn: false, user: null, docData: null }
  },
  mutations: {
    setLoggedInUser: function(state, user) {
      state.userProfile = user;
      console.log("store cl", user)
    }
  },
  actions: {
    async fetchUser({ commit }, user) {
      if (user) {
        const userProfile = await userCollection.doc(user.uid).get()

        console.log(user.uid)
        console.log("USERPROFILE", userProfile.data());

        if (userProfile.exists) {
          commit("setLoggedInUser", { loggedIn: true, data: user, docData: userProfile.data() });
          
          if (router.name == "Sign Up" || router.name == "Login") {
            router.push("/");
          }
        } else {
          console.log("User signed in but no doc data. Signing out.")
          auth.signOut();
          commit("setLoggedInUser", { loggedIn: false, data: null, docData: null })
        } 
      } else {
        commit("setLoggedInUser", { loggedIn: false, data: null, docData: null })
      }
    } 
  },
  modules: {
  }
})
