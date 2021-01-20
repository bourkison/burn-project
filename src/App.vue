<template>
  <v-app id="inspire">
    <v-app-bar
      app
      flat
    >
      <v-avatar
        size="32"
      ></v-avatar>

      <v-tabs
        centered
        class="ml-n9"
      >
        <v-tab to="/">Home</v-tab>
        <v-tab v-if="$store.state.userProfile.loggedIn" to="/exercises/new">New Exercise</v-tab>
        <v-tab v-if="$store.state.userProfile.loggedIn" @click="signOut()">Sign Out</v-tab>
        <v-tab v-if="!$store.state.userProfile.loggedIn" to="/login">Login</v-tab>
        <v-tab v-if="!$store.state.userProfile.loggedIn" to="/signup">Sign Up</v-tab>
      </v-tabs>

      <v-avatar
        class="hidden-sm-and-down"
        size="32"
      ></v-avatar>
    </v-app-bar>

    <v-main class="lighten-3">
        <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { auth } from './firebase'
export default {
  methods: {
    signOut: function() {
      auth.signOut();
    }
  }
}
</script>