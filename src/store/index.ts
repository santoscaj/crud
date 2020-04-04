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
  telephones: Telephone[] = [{
    id: v4(),
    name: '',
    number: '',
  }]
}

interface State{
  selectedUserId: string
  selectedUser: User
  users: User[]
}

export default new Vuex.Store({
  state: {
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
    getSelectedUser(state, getters){
      return getters.getUserByID(state.selectedUserId)
    },
    getSelectedUserId(state){
      return state.selectedUserId
    },
  },
  mutations: {
    setSeletedUser(state, {id, user}){
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
    saveSelectedUser(state){
      const activeUserIndex = state.users.findIndex((user: User) => user.id == state.selectedUserId)
      if(activeUserIndex > -1){
        state.users.splice(activeUserIndex, 1, state.selectedUser)
      } else {
        state.users.push(state.selectedUser)
      }
    },
    setNewUser(state){
      state.selectedUser = new User()
      state.selectedUserId = state.selectedUser.id
    }
  },
  actions: {
    setSeletedUser({ commit, getters }, id){
      const user = getters.getUserByID(id)
      commit('setSeletedUser', { id, user })
    },
    resetSelectedUser({ state, getters, dispatch }){
      const selectedUser = getters.getUserByID(state.selectedUserId)

      if(selectedUser){
        dispatch('setSeletedUser', selectedUser.id)
      } else {

      }
    },
  },
});
