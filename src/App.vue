<template>
  <div id="app">
    <HelloWorld/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import HelloWorld from './components/HelloWorld.vue';

export default Vue.extend({
  name: 'App',
  components: {
    HelloWorld,
  },
  beforeCreate() {
    const allUsers = this.$store.getters['get'];
    var maxUserId = 0;
    allUsers.forEach((user : any) => {
      if (user.id > maxUserId)
        maxUserId = user.id
    })
    console.log('max user id ',this.$store.state.maxUserId)
  },
});
</script>

<style>
html,body, *{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: 100%;
  height:100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
