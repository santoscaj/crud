<template>
  <div class="hello">

    <div class="block" v-for="user in getUsers" :key="user.id">
      <router-link :to="'/user/'+user.id">{{user.firstName.toUpperCase()}} {{user.lastName.toUpperCase()}}</router-link>
    </div>
    <div class="block" id="addUser">
      <router-link to='/user/new'> + </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapMutations } from 'vuex';

export default Vue.extend({
  name: 'Sidebar',
  props: {
    msg: String,
  },
  computed: {
    ...mapGetters([
      'getUsers',
      'getUserByID',
    ]),
  },
  watch: {
    '$route.params.id'(newValue, oldValue) {
    this.$store.dispatch('setSelectedUser',newValue)
    this.$store.commit('clearNewPhoneData')
    },
  },
  methods: {
    ...mapMutations([
      'setSeletedUser',
    ]),
  },
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
  width: 100%;
  display: inline-block;
  text-decoration: none;
}
a:hover {
  color: white;
  padding: 0;
  margin: 0;
  background-color: #42b983;
  width: 100%;
  display: inline-block;
}

.hello{
  display: flex;
  flex-direction: column;
  width: 100%;

}
.router-link{
  color: red;
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
