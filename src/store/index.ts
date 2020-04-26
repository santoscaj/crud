import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { v4 } from 'uuid'
import _cloneDeep from 'lodash/cloneDeep'
import axios from 'axios'
import qs from 'qs'

let usersURL = 'http://localhost:3000/users'

Vue.use(Vuex);

export class Telephone{
  id: string = v4()
  name: string = ''
  number: string = ''
}

class User{
  id: string = v4()
  firstName: string = ''
  lastName: string = ''
  telephones: Telephone[] =[]
  //  = [{
  //   id: v4(),
  //   name: '',
  //   number: '',
  // }]
}

interface RootState {
  newPhone: {name: string, number: string};
  selectedUserId: string;
  selectedUser: User;
  users: User[];
}

// const store : StoreOptions<RootState> = {
//   state:{
//     newPhone:{name:'', number: ''},
//     selectedUserId: '',
//     selectedUser : new User(),
//   }
// }

export default new Vuex.Store<RootState>({
  state: {
    newPhone:
    {
      name: '',
      number: ''
    },
    selectedUserId: '',
    selectedUser: new User(),
    users: [
      
    ],
  },
  getters: {
    getUsers(state: RootState, getters) {
      return state.users;
    },
    getUserByID: (state) => (id: number | string) => state.users.find((user) => user.id == id)
    ,
    checkIfIDExists: (state) => (id: number | string ) =>{
      return state.users.some(usr => usr.id == id)
    },
    getSelectedUser(state, getters){
      return state.selectedUser
    },
    getSelectedUserId(state){
      return state.selectedUserId
    },
  },
  mutations: {
    setSelectedUser(state, {id, user}){
      state.selectedUserId = id
      state.selectedUser = user
    },
    delete(state, id) {
      state.users =  state.users.filter((user) => user.id != id);
    },
    post(state, newUserData) {
      const fieldsToModify = Object.keys(newUserData);
      state.users.forEach((user) => {
        if (user.id == newUserData.id) {
          fieldsToModify.forEach((field) => {
            // @ts-ignore
            user[field] = newUserData[field];
          });
        }
      });
    },
    clearNewPhoneData(state){
      state.newPhone.name = ''
      state.newPhone.number = ''
    },
    addEmptyPhone(state){
      let newPhone = new Telephone()
      state.selectedUser.telephones.push(newPhone)
    },
    addNewPhone(state){
      let newPhone = new Telephone()
      let id = state.selectedUserId;
      newPhone.name = state.newPhone.name;
      newPhone.number = state.newPhone.number
      state.newPhone = {
        name:  '',
        number:  '',
      }
      state.selectedUser.telephones.push(newPhone)
    },
    updateEditName(state, data){
      state.newPhone.name = data
      state.newPhone = {
        ...state.newPhone,
        name: data,
      }
    },
    updateEditNumber(state, data){
      state.newPhone.number= data
    },
    deleteSelectedUser(state){

      let id = state.selectedUserId
      let index = state.users.findIndex(usr => usr.id == id)
      
      if(index>-1){
        axios
        .delete(usersURL+`/${id}`)
        // .delete(usersURL+`/1836218`)
        .then(response=>{
          if (response.status == 200){
            state.users.splice(index, 1)
          }
        })
        .catch(err=>{
          console.error(err)
        })
      }else{
        console.error('ID not found in current list. Please reload page')
      }

    },
    setUsers(state,users){
      state.users = users
    },
    saveSelectedUser(state){
      //
      const activeUserIndex = state.users.findIndex((user: User) => user.id == state.selectedUserId)
      const userToBeSaved = state.selectedUser
      const id = state.selectedUserId

      if(activeUserIndex > -1){
          // Editing old user
          axios.put(usersURL+`/${id}`,qs.stringify(userToBeSaved))
          .then(response=>{
            if(response.status == 200)
              state.users.splice(activeUserIndex, 1, userToBeSaved)
          })
          .catch(err=> {console.error('err')})
      }
      else {
        // Adding new user
        axios.post(usersURL,qs.stringify(userToBeSaved))
        .then(response=>{
          if(response.status == 200)
            state.users.push(userToBeSaved)
        })
        .catch(err=> {console.error('err')})
      }
    },
    removePhoneNumber(state, id){
      const phoneIndex = state.selectedUser.telephones.findIndex(usr => usr.id == id)
      if(phoneIndex>-1)
        state.selectedUser.telephones.splice(phoneIndex, 1)

    },
  },
  actions: {
    async loadUsers(ctx){
        let response = await axios.get('http://localhost:3000/users')
        if(response.status = 200)
          ctx.commit('setUsers',response.data)
    },
    setSelectedUser({ commit, getters }, id){
      if (id==='new'){
        const newUser = new User()
        const newUserID = v4()

        commit('setSelectedUser', { id:newUserID, user:newUser })
      }
      else{
        const user = getters.getUserByID(id)
        const selectedUser = _cloneDeep(user)
        commit('setSelectedUser', { id, user:selectedUser })
      }
    },
    resetSelectedUser({ state, getters, dispatch }){
      const selectedUser = getters.getUserByID(state.selectedUserId)

      if(selectedUser){
        dispatch('setSeletedUser', selectedUser.id)
      } else {
        dispatch('setSeletedUser', selectedUser.id)
      }
    },
  },
});
