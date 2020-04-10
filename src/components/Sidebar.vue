<template>
  <div class="hello">
    <div :class="{'block': true, 'active': user.id===getSelectedUserId}" v-for="user in getUsers" :key="user.id">
      <router-link :to="'/user/'+user.id">{{user.firstName}} {{user.lastName}}</router-link>
    </div>

    <div :class="{'block': true, 'active': 'new'===getSelectedUserId}" id="addUser">
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
      'getSelectedUserId',
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
  box-sizing: border-box;
  /* background: #42b983; */
  background: #00A5E8;
  background: gray;
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
  padding: 10px;
  color: #42b983;
  width: 100%;
  height: 100%;
  display: inline-block;
  text-decoration: none;
  color: black;
}

/* a:hover {
  color: white;
  padding: 0;
  margin: 0;
  background-color: #42b983;
  width: 100%;
  display: inline-block;
} */

.hello{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

}
.router-link{
  color: red;
}

.block{
  border: 2px solid rgb(255,255,255,0);
  /* padding: 10px; */
  font-size: 14px;
  /* width: 90%; */
  height: auto;
  /* margin: 1% 5%; */
  text-align: left;
  background-color: darkgreen;
  background: #74B2DF;
  /* background: blue;
  color: white; */
  /* border-radius: 3px; */
}

.block:hover{
  cursor: pointer;
  border: 2px solid #74B2DF;
  color: white;
  color: #74B2DF;
  background-color: white;
  /* background-color: #00A5E8; */
  /* background-color: white; */
}

.block>*{
  background:inherit
}

#addUser{
  text-align: center;
}


.line{
  height: auto;
}

.active{
  background: white;
  color: blue;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}

</style>
