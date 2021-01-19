<template>
  <div id="app">
    <div id="nav">
      <div id="lNav" class="navHalf">
        <span v-if="$store.state.userProfile.loggedIn">{{ $store.state.userProfile.loggedIn }}</span>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <div id="tempLogo"></div>
      <div id="rNav" class="navHalf">
        <router-link to="/login">Log In</router-link> | 
        <router-link to="/signup">Sign Up</router-link>
        <button @click="signOut">Sign Out</button>
      </div>
    </div>
    <router-view/>
  </div>
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

<style>
body {
  background-color: #111418;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #F3FCF0;
}

#nav {
  width: 100%;
  padding: 15px 0 30px;
  background-color: #2a343c;
  box-sizing: border-box;
  box-shadow: 1px 1px #191e24;
}

.navHalf {
  width: calc(50% - 50px);
  margin: 0;
  display: inline-block;
  line-height: 50px;
  vertical-align: middle;
  padding: 0 10px;
  box-sizing: border-box;
}

#lNav {
  text-align: right;
}

#rNav {
  text-align: left;
}

#nav a {
  font-weight: bold;
  color: #f3fcf0;
}

#nav a:hover {
  color: #FFA987;
}

#nav a.router-link-exact-active {
  color: #CE3B54;
}

#tempLogo {
  height: 100px;
  width: 100px;
  vertical-align: middle;
  border-radius: 50px;
  background-color: #FFA987;
  display: inline-block;
  margin: 0 auto;
}

.loader {
  margin: 0 auto;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #555;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
