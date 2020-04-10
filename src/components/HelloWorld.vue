<template>
  <div class="hello">
      <Sidebar class="left"/>
      <Data class="right" />
      <div class="space" ></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import Data from '@/components/Data.vue';

export default Vue.extend({
  name: 'HelloWorld',
  components: {
    Sidebar,
    Data,
  },
  props: {
    msg: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.left{
  flex: 0 0 200px;  
  padding: 5px 0px;
  height: 100%;
}

.right{
  flex: 0 1 700px;  
  padding: 50px 10px;
  overflow-y: auto;
}

.space{
  flex: 1 1 400px;
}

.hello{
  width: 100%;
  height: 100%;
  display:flex;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
/* a {
  color: #42b983;
  text-decoration: none;
} */
</style>
