<template>
  <div id="home">
    <div class="container" v-if="$store.state.userProfile.loggedIn">
      <h1>Welcome {{ $store.state.userProfile.docData.firstName }}</h1>
      This is a test.
    </div>
    <div class="container" v-else>
      <router-link to="/login">Login</router-link> or <router-link to="/signup">Sign Up</router-link> to get started.
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: { }
}
</script>

<style scoped>
  #home {
    width: 968px;
    margin: 15px auto 0;
    display: inline-block;
    
  }

.container {
    background-color: #2a343c;
    border-radius: 5px;
    padding: 10px;
  }

  h1 {
    font-family: "Proxima Nova Rg", sans-serif;
  }
  
</style>