<template>
<div v-if="errorpage">
  Error 404 page not found. LOL
</div>
<div v-else class="columns">
  <!-- <template v-for="property in Object.keys(getSelectedUser).filter(key => key !== 'id')">
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
  </template> -->
  <div class="row">
    <div class="label"> {{labels.firstName}}  </div>
    <!-- <div class="value"> {{getSelectedUser.firstName}} </div> -->
    <div class="phone-value"><input type="text" v-model="getSelectedUser.firstName"></div>

  </div>

  <div class="row">
    <div class="label"> {{labels.lastName}}  </div>
    <!-- <div class="value"> {{getSelectedUser.lastName}} </div> -->
    <div class="phone-value"><input type="text" v-model="getSelectedUser.lastName"></div>

  </div>

  <div class="row">
    <div class="label"> {{labels.telephones}}  </div>
  </div>
  
  <div v-for="telephone in getSelectedUser.telephones" class="row" :key="telephone.id">
    <div class="row"> 
      <div class="label btn-label">
        <button @click="removePhoneNumber(telephone.id)">x</button>
      </div>
      <div class="telephone"> 
        <div class="phone-label">{{telephone.name}}</div>
        <!-- <div class="phone-value">{{telephone.number}}</div> -->
        <input type="text" v-model="telephone.number">
      </div>
    </div>
  </div>
  <div class="columns new-phone">

    <div class="row"> 
        <div class="label"></div>
      <div class="telephone"> 
        <div class="phone-label"><input type="text" v-model="editPhoneName"></div>
        <div class="phone-value"><input type="text" v-model="editPhoneNumber"></div>
      </div>
    </div>
    
    <div class="row"> 
      <div class="label"></div>
      <div class="telephone"> 
        <button class="phone-label" @click="clearNewPhoneData()" >clear</button>
        <button class="phone-value" @click="addNewPhone()">add</button>
      </div>
    </div>

  </div>

  <div class="space"></div>

  <div class="last-row">
    <button @click="deleteSelectedUser()" class="button">delete</button>
    <button @click="setSelectedUser(id)" class="button">reset</button>
    <button @click="saveSelectedUser()" class="button">save</button>
  </div>


</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import _startCase from 'lodash/startCase';

export default Vue.extend({
  name: 'Data',
  data(){
    return {
      labels: {
        firstName:'First Name',
        lastName: 'Last Name',
        telephones: 'Contact Info'
      },
      // newPhone:{
      //   name: '',
      //   value: ''
      // }
    }
  },
  props: {
    msg: String,
  },
  computed: {
    ...mapGetters([
      'getUsers',
      'getSelectedUser',
      'checkIfIDExists'
    ]),
    editPhoneName: {
      get(){
        return this.$store.state.newPhone.name
      },
      set(value){
        // this.$store.commit('updateEditName',value)
        // this should have worked, no Caleb?
        this.$store.state.newPhone.name = value
      }
    },
    editPhoneNumber:{
      get(){
        return this.$store.state.newPhone.number
      },
      set(value){
        // this.$store.commit('updateEditNumber',value)
        this.$store.state.newPhone.number = value
      }
    },
    // newPhone: {
    //   get(){
    //     return {name: this.$store.state.newPhone.name, number: this.$store.state.newPhone.number}
    //   },
    //   set(data : {name:string, number: string}){
    //     this.$store.state.newPhone.name = "1"
    //     this.$store.state.newPhone.number = '2'
    //   }
    // },
    id() {
      return this.$route.params.id;
    },
    // getSelectedUser() {
    //   let id = this.$route.params.id;
    //   return this.$store.getters.getUserByID(id);
    // },
    // getPlainProperties() {
    //   let id = this.$route.params.id;
    //   return this.$store.getters.getUserPlainProperties(id);
    // },
    // getArrayProperties() {
    //   return this.$store.getters.getUserArrayProperties(id);
    // },
    errorpage(){
      let id = this.$route.params.id;
      return (!this.checkIfIDExists(id)) && (id!=='new')
    },
  },
  methods: {
    ...mapActions(['setSelectedUser']),
    ...mapMutations(['addNewPhone',
          'clearNewPhoneData',
          'updateEditNumber',
          'updateEditName',
          'removePhoneNumber',
          // 'saveSelectedUser',
          // 'deleteSelectedUser',
          // 'setSelectedUser',
          ]),
    // deleteField(x: number, y: number) {
    //   console.log(x, y);
    // },
    startCase(label: string) {
      return _startCase(label);
    },
    addPhone(){
      
      // this.$store.dispatch('addNewPhone');
      //Caleb why this does not work?
      // this.$store.commit('clearNewPhoneData');
      
      // nor this... 
      // this.$store.state.newPhone.name = ''
      // this.$store.state.newPhone.number = ''
    },
    saveSelectedUser(){
      let id = this.$store.getters['getSelectedUser']['id']
      this.$store.commit('saveSelectedUser')
      this.$router.push({path: `/user/${id}`})
    },
    deleteSelectedUser(){
      if(confirm('Do you really want to delete it?'))
        this.$store.commit('deleteSelectedUser')
    }
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

.label,.phone-label{
  flex: 0 1 40%;
  height: auto;
  margin:0;
}
.value,.phone-value{
  flex: 1 1 60%;
  background: white;
  border: 1px solid black;
  height: auto;
  margin: 0;
}

.phone-value{
  padding:0;
}

/* .value1{
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
} */

.telephone{
  display: flex;
}

.new-phone{
  margin: 5px 0;
  border: 1px solid gray;
}

.mini-title{
  font-size: 10px;
  width: 100%;
  height: auto;
}
.group{
  flex: 1 1 100%;
}

.space{
  flex: 1 1 auto;
}
.btn-label{
  display: flex;
  justify-content: flex-end;
}

.btn-label>*{
   flex: 0 1 25px;
   border-radius: 25px;
   border: 1px solid red;
   background-color: white;
   color: red;
}

.btn-label>*:hover{
   flex: 0 1 25px;
   border-radius: 25px;
   border: 1px solid red;
   background-color: red;
   color: white;
}

.last-row{
  flex: 0 0 30px;
  display:flex;
}

</style>


