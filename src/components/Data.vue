<template>
  <div class="hello">
    <!-- <div class="display-area"> -->
      <!-- <div class="columns" v-if="getSelectedUserId == 0 ">
        new user
      </div> -->

      <div class="columns">
        <!-- {{getSelectedUser.id}} -->

        <div class="columns group">

          <div class="row" v-for="prop in getSelectedUserPlainProperties" :key="prop">
              <div class="label"> {{prop}}  </div>
              <div class="value"> <input type="text" :value="getSelectedUser[prop]"/> </div>
          </div>

          <div class="columns" v-for="prop in getSelectedUserArrayProperties" :key="prop.name">
            <div class="mini-title">{{prop.label}}</div>
            <div v-for="subProp  in getSelectedUser[prop.name]" :key="subProp.name" class="row">
              <div class="label"> {{subProp.name}} </div>
              <div class="value1"> <input type="text" :value="subProp.details"/> </div>
              <div class="value2" @click="deleteField(prop.name, subProp.name)">x</div>
            </div>
            <div>+</div>
          </div>

        </div>

        <div class="last-row">
          <button class="button">delete</button>
          <button class="button">reset</button>
          <button class="button">save</button>
        </div>
      </div>

    <!-- </div> -->
  
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters }  from 'vuex'

export default Vue.extend({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  computed:{
    ...mapGetters([
      'getSelectedUser',
      'getSelectedUserId',
      'getSelectedUserPlainProperties',
      'getSelectedUserArrayProperties'
    ])
  },
  methods:{
    deleteField(x: number,y:number){
      console.log(x,y)
    }
  }
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


