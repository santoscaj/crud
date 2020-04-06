import Vue from 'vue';
import Vuex from 'vuex';
import { v4 } from 'uuid'


Vue.use(Vuex);

class Telephone{
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

interface State{
  newPhone: {name: string, number: string}
  selectedUserId: string
  selectedUser: User
  users: User[]
}

export default new Vuex.Store({
  state: {
    newPhone:
    {
      name: '',
      number: ''
    },
    selectedUserId: '',
    selectedUser: new User(),
    users: [
      {
        id: v4(),
        firstName: 'first',
        lastName: 'user',
        telephones: [
          {
            id: v4(),
            name: 'home',
            number: '001-123-4567',
          },
        ],
      },
      {
        id: v4(),
        firstName: 'second',
        lastName: 'user',
        telephones: [
          {
            id: v4(),
            name: 'home',
            number: '002-123-4567',
          },
        ],
      },
      {
        id: v4(),
        firstName: 'third',
        lastName: 'user',
        telephones: [
          {
            id: v4(),
            name: 'home',
            number: '003-123-4567',
          },
          {
            id: v4(),
            name: 'work',
            number: '003-123-4567',
          },
        ],
      },
    ],
  },
  getters: {
    getUsers(state: State, getters) {
      return state.users;
    },
    getUserByID: (state) => (id: number | string) => {
      return state.users.find((user) => user.id == id);
    },
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
    addNewPhone(state){
      let newPhone = new Telephone()
      let id = state.selectedUserId;
      newPhone.name = state.newPhone.name;
      newPhone.number = state.newPhone.number
      
      // console.log(state.newPhone)
      // let user = state.users.find(user=>user.id==id) || null;

      // // Caleb why is this necessary? I tried with another method and didnt work
      state.newPhone.name = ''
      state.newPhone.number = ''

      // if(user)
      //   user.telephones.push(newPhone)
      state.selectedUser.telephones.push(newPhone)
    },
    updateEditName(state, data){
      state.newPhone.name = data
    },
    updateEditNumber(state, data){
      state.newPhone.number= data
    },
    deleteSelectedUser(state){
      let id = state.selectedUserId
      let index = state.users.findIndex(usr => usr.id == id)

      if(index>-1){
        state.users.splice(index, 1)
      }

    },
    saveSelectedUser(state){
      const activeUserIndex = state.users.findIndex((user: User) => user.id == state.selectedUserId)
      if(activeUserIndex > -1){
        state.users.splice(activeUserIndex, 1, state.selectedUser)
      } else {
        state.users.push(state.selectedUser)
      }
    },
    // setNewUser(state){
    //   state.selectedUser = new User()
    //   state.selectedUserId = state.selectedUser.id
    // }
  },
  actions: {
    setSelectedUser({ commit, getters }, id){
      if (id==='new'){
        // Hi Caleb is this necessary? I mean to create new consts before commiting 
        const newUser = new User()
        const newUserID = v4()
        commit('setSelectedUser', { id:newUserID, user:newUser })
      }
      else{
        // Caleb how would you do this
        const user = getters.getUserByID(id)
        let newUser = new User();
        newUser.firstName = user.firstName;
        newUser.lastName = user.lastName;
        // newUser.telephones = []

        user.telephones.forEach((t: Telephone) => {
          let newTelephone = new Telephone();
          newTelephone.name = t.name
          newTelephone.number = t.number

          newUser.telephones.push(newTelephone)

          commit('setSelectedUser', { id, user:newUser })
        })

      }
    },
    // addNewPhone({commit}){
    //   commit('addNewPhone')
    //   commit('clearNewPhoneData')
    // },
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
