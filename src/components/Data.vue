<template>
<div class="columns">
  <template v-for="property in Object.keys(getSelectedUser).filter(key => key !== 'id')">
      <div class="row" :key="getSelectedUser.id + property">
        <div class="label"> {{ property }} </div>
        <div class="values" v-if="Array.isArray(getSelectedUser[property])">
          <div class="value" v-for="secondProperty in Object.keys(getSelectedUser[property])" :key="getSelectedUser.id + property + secondProperty">

          </div>
        </div>
        <div v-else class="value">
          <input type="text" :value="getSelectedUser[property]"/>
        </div>
      </div>
  </template>

  <div class="last-row">
    <button class="button">delete</button>
    <button class="button">reset</button>
    <button class="button">save</button>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import _startCase from 'lodash/startCase';

export default Vue.extend({
  name: 'Data',
  props: {
    msg: String,
  },
  computed: {
    ...mapGetters([
      'getUsers',
      'getSelectedUser',
    ]),
    id() {
      return this.$route.params.id;
    },
    getSelectedUser() {
      let id = this.$route.params.id;
      return this.$store.getters.getUserByID(id);
    },
    getPlainProperties() {
      let id = this.$route.params.id;
      return this.$store.getters.getUserPlainProperties(id);
    },
    getArrayProperties() {
      let id = this.$route.params.id;
      return this.$store.getters.getUserArrayProperties(id);
    },
  },
  methods: {
    deleteField(x: number, y: number) {
      console.log(x, y);
    },
    startCase(label: string) {
      return _startCase(label);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html{
  background: bisque;
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

input{
  background-color: white;
}

.hello{
  padding: 3px;
  border: 1px solid white;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
}

.display-area{
  flex: 1 1 auto;
}

.columns{
  display: flex;
  flex-direction:column;
  height: 100%;
  width: 100%;
}

.columns>*{
  height: auto
}

.row{
  display:flex;
  line-height: 25px;
  margin: 2px 0;
}

.row>*{
  padding-left : 10px;
  text-align: left;
}

.label{
  flex: 1 1 40%;
  height: auto;
}
.value{
  flex: 1 1 60%;
  background: white;
  border: 1px solid black;
  height: auto;
}

.value1{
  flex: 1 1 50%;
  background: white;
  border: 1px solid black;
  height: auto;
}

.value2{
  flex: 1 1 10%;
  background: white;
  border: 1px solid black;
  height: auto;
}

.mini-title{
  font-size: 10px;
  width: 100%;
  height: auto;
}
.group{
  flex: 1 1 100%;
}

.last-row{
  flex: 0 0 30px;
  display:flex;
}

</style>


