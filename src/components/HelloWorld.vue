<template>
  <div class="hello">
      <Sidebar class="left"/>
      <Data class="right" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Sidebar from '@/components/Sidebar.vue'
import Data from '@/components/Data.vue'

export default Vue.extend({
  name: 'HelloWorld',
  components: {
    Sidebar,
    Data
  },
  props: {
    msg: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.left{
  flex: 0 1 250px;  
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
a {
  color: #42b983;
}
</style>
