<template>
<div v-if="errorpage">
  Error 404 page not found. LOL
</div>
<div v-else class="columns">

  <DualInput :error_on_value="Boolean(!getSelectedUser.firstName)" error_message_value="Value cannot be empty" :label="labels.firstName" v-model="getSelectedUser.firstName" />
  <DualInput :label="labels.lastName"  v-model="getSelectedUser.lastName" />
  <DualInput :label="labels.telephones" :value_is_editable="false"  />

  <template :if="getSelectedUser.telephones.length > 0">
     <div v-for="telephone in getSelectedUser.telephones" class="row" :key="telephone.id">
        <div class="label btn-label">
          <button class="small-btn red-btn" @click="removePhoneNumber(telephone.id)">
            <!-- <i class="fas fa-trash-alt"></i> -->
            <i class="fas fa-times"></i>
          </button>
          <!-- <button class="small-btn orange-btn" @click="removePhoneNumber(telephone.id)">
            <i class="fas fa-pen"></i>
            <i class="fas fa-minus"></i>
          </button> -->
        </div>
        <DualInput :label_is_editable="true" :label="telephone.name"  v-model="telephone.number" @labelChanged="value => telephone.name = value" />
      </div>
  </template>

  <template :if="getSelectedUser.additionalNumbers.length > 0">
     <div v-for="telephone in getSelectedUser.additionalNumbers" class="row" :key="telephone.id">
        <div class="label btn-label">
          <button class="small-btn red-btn" @click="removePhoneNumber(telephone.id)">
          </button>
        </div>
        <DualInput :label_is_editable="true" :label="telephone.name"  v-model="telephone.number" />
      </div>
  </template>

  <div class="row"> 
    <div class="label btn-label">
      <button @click="addPhoneField()" class="small-btn green-btn">
        <i class="fas fa-plus"></i>
      </button>
    </div>
    <DualInput :label_is_editable="false" :value_is_editable="false"/>
  </div>

  <div class="space"></div>

  <div class="last-row">
    <button @click="deleteSelectedUser()" class="submit-btn">DELETE</button>
    <button @click="setSelectedUser(id)" class="submit-btn">RESET</button>
    <button @click="saveSelectedUser()" class="submit-btn">SAVE</button>
  </div>


</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import DualInput from '@/components/Input.vue';
import _startCase from 'lodash/startCase';

export default Vue.extend({
  name: 'Data',
  data(){
    return {
      labels: {
        firstName:'First Name',
        lastName: 'Last Name',
        telephones: 'Telephones'
      },

    }
  },
  components: {DualInput},
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
        this.$store.state.newPhone.name = value
      }
    },
    editPhoneNumber:{
      get(){
        return this.$store.state.newPhone.number
      },
      set(value){
        this.$store.state.newPhone.number = value
      }
    },
    id() {
      return this.$route.params.id;
    },
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
    startCase(label: string) {
      return _startCase(label);
    },
    addPhone(){
      
      this.$store.dispatch('addNewPhone');
      this.$store.commit('clearNewPhoneData');
    },
    saveSelectedUser(){
      let id = this.$store.getters['getSelectedUser']['id']
      this.$store.commit('saveSelectedUser')
      this.$router.push({path: `/user/${id}`})
    },
    deleteSelectedUser(){
      if(confirm('Do you really want to delete it?'))
        this.$store.commit('deleteSelectedUser')
    },
    addPhoneField(){
      this.$store.commit('addEmptyPhone')
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
  text-decoration: none;
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
  flex: 0 0 40%;
  height: auto;
  margin:0;
}
.value,.phone-value{
  flex: 0 0 60%;
  background: white;
  border: none;
  height: auto;
  margin: 0;
}

.phone-value{
  padding:0;
}

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

i{
  font-size: 8px;
  padding: 3px;
  line-height: 16px;
}

.small-btn{
  flex: 0 1 25px;
  border-radius: 25px;
  line-height: 100%;
  height: 25px;
  font-weight: 500;
  margin: 3px;
}

.red-btn{
  border: 1px solid red;
  background-color: white;
  color: red;
}

.red-btn:hover{
   border: 1px solid red;
   background-color: red;
   color: white;
}

.green-btn{
  border: 1px solid green;
  background-color: white;
  color: green;
}

.green-btn:hover{
   border: 1px solid green;
   background-color: green;
   color: white;
}

.orange-btn{
  border: 1px solid orange;
  background-color: white;
  color: orange;
}

.orange-btn:hover{
   border: 1px solid orange;
   background-color: orange;
   color: white;
}

.last-row{
  flex: 0 0 30px;
  display:flex;
}

.new-phone{
  border: 1px solid lightseagreen;
  border-radius: 3px;
  background: lightgreen;
}

input{
  border: none;
  outline: none;
  box-shadow: none;
  background: white;
  border: 1px solid lightgray;
  border-radius: 3px;;
  padding: 0 5px;
  height: 95%
}

input:hover{
  border: 1px solid gray;
}

input:focus{
  border: 1px solid #42b983;
}

.telephone{
  padding: 2px;
  flex: 0 0 60%
}

.telephone div{
  border: none;
  box-shadow: none;
  margin: 0px 3px;
  line-height: 20px;
}

.telephone>*{
  flex: 1 1 200px;
}

.submit-btn, .submit-btn:focus{
  border: 1px solid green;
  color: green;
  background-color: white;
  border-radius: 4px;
  margin: 3px;
  padding: 2px 4px;
  line-height: 10px;
}

.submit-btn:hover{
  border: 1px solid green;
  color: white;
  background: green;
  border-radius: 4px;
  margin: 3px;
}

.error-message{
  border:1px solid salmon !important;
  /* height: 95% */
}


/* .error-message::after{
  content: "There is an error with this field";
  font-size: 8px;
  color: salmon;
  border:1px solid salmon;
  position: absolute;
  width: 100%;
  flex-basis: 100%;


  top: 0;
  z-index: -1;
} */

</style>


