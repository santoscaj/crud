import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { v4 } from 'uuid'


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
      {
        id: v4(),
        firstName: 'first',
        lastName: 'last name',
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
        lastName: 'another last name',
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
        lastName: 'yet another last name',
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
      state.selectedUserId = state.selectedUser.id

      let newUser = new User()
      newUser.firstName = state.selectedUser.firstName
      newUser.lastName = state.selectedUser.lastName
      state.selectedUser.telephones.forEach(t=>{
        let newTelephone = new Telephone()
        newTelephone.name = t.name
        newTelephone.number = t.number

        newUser.telephones.push(newTelephone)
      })

    },
    removePhoneNumber(state, id){
      const phoneIndex = state.selectedUser.telephones.findIndex(usr => usr.id == id)
      if(phoneIndex>-1)
        state.selectedUser.telephones.splice(phoneIndex, 1)

    },
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
        })

        commit('setSelectedUser', { id, user:newUser })


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
