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

button{
  font-family: 'Advent Pro', sans-serif;
}

#app {
  font-family: 'Comic Neue', cursive;
  font-family: 'Major Mono Display', monospace;
  font-family: 'Advent Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
