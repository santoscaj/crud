<template>
  <div class="hello">
    <div class="block" v-for="user in get" :key="user.id" @click="setSeletedUser(user.id)">
      <div class="line">{{user.firstName}} {{user.lastName}}</div>
    </div>
    <div class="block" id="addUser"  @click="setSeletedUser(0)">
      +
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapMutations } from 'vuex'

export default Vue.extend({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  computed:{
    ...mapGetters([
      'get', 
      'getID'
    ])
  },
  methods:{
    ...mapMutations([
      'setSeletedUser'
    ])
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,*{
  background: #42b983;
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
.hello{
  display: flex;
  flex-direction: column;
  width: 100%;

}

.block{
  border: 1px solid black;
  padding: 2px 2px 2px 8px;
  width: 90%;
  height: auto;
  margin: 1% 5%;
  background: white;
  text-align: left;
  border-radius: 3px;
}

.block>*{
  background:inherit
}

#addUser{
  text-align: center;
}

.block:hover{
  cursor: pointer;
}

.line{
  height: auto;
}

</style>
