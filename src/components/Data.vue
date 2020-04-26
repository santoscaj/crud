<template>
<div v-if="errorpage">
  Error 404 page not found. LOL
  <Modal v-model="confirmation.visible" :message="confirmation.message" :title="confirmation.title" :callback="confirmation.callback()" :type="confirmation.type" />
</div>
<div v-else class="columns">
  <Modal v-model="confirmation.visible" :message="confirmation.message" :title="confirmation.title" :callback="confirmation.callback()" :type="confirmation.type" />
  <DualInput :error="nameFieldValidation('', getSelectedUser.firstName)" :label="labels.firstName" v-model="getSelectedUser.firstName" />
  <DualInput :error="nameFieldValidation('',getSelectedUser.lastName)" :label="labels.lastName"  v-model="getSelectedUser.lastName" />
  <DualInput :label="labels.telephones" :editValue="false"  />

  <template :if="getSelectedUser.telephones.length > 0">
     <div v-for="telephone in getSelectedUser.telephones" class="row" :key="telephone.id">
        <div class="label btn-label">
          <button class="small-btn red-btn" @click="removePhoneNumber(telephone.id)">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <DualInput type="telephone" valuePlaceholder="(   )    -    " :error="telephoneValidation(telephone.name, telephone.number)" :editLabel="true" :label="telephone.name"  v-model="telephone.number" @labelChanged="value => telephone.name = value" />
      </div>
  </template>

  <div class="row"> 
    <div class="label btn-label">
      <button @click="addPhoneField()" class="small-btn green-btn">
        <i class="fas fa-plus"></i>
      </button>
    </div>
    <DualInput :editLabel="false" :editValue="false"/>
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
import { Telephone } from '@/store'
import DualInput from '@/components/Input.vue';
import Modal from '@/components/Modal.vue';
import _startCase from 'lodash/startCase';
import { required, extract, numericOnly } from '../utils';

const MyMixin = {
  computed: {
    nameFieldValidation:()=>( labelContent: string, valueContent: string)  : {label: {show: boolean, message: string}, value: {show: boolean, message: string} } => ({
      label: extract([required(labelContent)]),
      value: extract([required(valueContent)])
    }),
    telephoneValidation(){
      return function(labelContent: string, valueContent: any){
        return {
          label: extract([required(labelContent)]),
          value: extract([
            required(valueContent),
            numericOnly(valueContent)
            ]),
        }
      }
    },
  }
}


export default Vue.extend({
  name: 'Data',
  data(){
    return {
      confirmation: {
        visible: false,
        title: '',
        message: '',
        type: 'confirmation',
        callback: ()=>()=>{}
      },
      labels: {
        firstName:'First Name',
        lastName: 'Last Name',
        telephones: 'Telephones'
      },
    }
  },
  components: {DualInput, Modal},
  props: {
    msg: String,
  },
  mixins:[ MyMixin ],
  computed: {
    ...mapGetters([
      'getUsers',
      'getSelectedUser',
      'checkIfIDExists'
    ]),
    validations(){
      return (field: string, value: any) => (({
        firstName: extract([
            required(value),
            {
              show: value.includes('a'),
              message: 'Value cannot contain a'
            }
        ]),
        lastName: extract([
            required(value),
            {
              show: value.includes('a'),
              message: 'Value cannot contain a'
            }
        ])
      }) as any)[field]
    },
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
    nameAndLastnameErrors(){
      let valueOnlyArray = [this.getSelectedUser.firstName, this.getSelectedUser.lastName]
      
      let error = !valueOnlyArray.every(value =>{
        return !extract([required(value)])['show']
      })

      return error;
    },
    telephoneErrors(){
      let labelAndValueArray : string[][] = []
      this.getSelectedUser.telephones.forEach((phone: Telephone) => labelAndValueArray.push([phone.name, phone.number]) )

      let error = !labelAndValueArray.every(value =>{
        let emptyFieldError = value.every(( x: string )=> !extract([required(x)])['show']  )
        let numericError =  !extract([numericOnly(value[1])])['show']
        return emptyFieldError && numericError
      })

      return error
    }
  },
  async mounted(){
    try{
      await this.$store.dispatch('loadUsers')
    }catch(e){
      // work on this
      // await this.$nextTick()
      this.$data.confirmation =
        {
          visible: true,
          title: 'Error!',
          message: 'Page could not load properly',
          type: 'information',
          callback: ()=>(confirmation: boolean)=>{}
        }
    }
  },
  methods: {
    confirm(confirmation: boolean){
      console.log('confirmation received', confirmation)
    },
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
      let self = this
      if(this.nameAndLastnameErrors || this.telephoneErrors){

      this.$data.confirmation =
        {
          visible: true,
          title: 'Information box',
          message: 'You cannot save user! input field contains error',
          type: 'information',
          callback: ()=>(confirmation: boolean)=>{}
        }
      }else{
        let id = this.$store.getters['getSelectedUser']['id']
        let newPath = `/user/${id}`
        try{
          this.$store.commit('saveSelectedUser')
          
          if(newPath != this.$router.currentRoute.path)
            this.$router.push({path: newPath})
          
          this.$data.confirmation =
          {
            visible: true,
            title: 'Information box',
            message: 'User saved successfully!',
            type: 'information',
            callback: ()=>(confirmation: boolean)=>{}
          }
        }catch(e){
          console.error(e)
          this.$data.confirmation ={
            visible: true,
            title: 'Error!',
            message: 'User could not be saved',
            type: 'information',
            callback: ()=>(confirmation: boolean)=>{}
          }
        }
      }
    },
    deleteSelectedUser(){
      // caleb why did I have to
      let self = this
      this.$data.confirmation =
      {
        visible: true,
        title: 'Confirmation box',
        message: 'Do you really want to delete the selected user?',
        type: 'confirmation',
        callback: ()=>(confirmation: boolean)=>{
          if(confirmation){
            self.$store.commit('deleteSelectedUser')
            self.$router.push({path:'/user/new'}) 
          }
        }
      }
    },
    addPhoneField(){
      if(!this.telephoneErrors)
        this.$store.commit('addEmptyPhone')
      else  
        console.log('there are errors and cannot be added.')
    },
    test:()=>(resultado: boolean)=>{
      console.log('el resultado manito fue ', resultado)
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


