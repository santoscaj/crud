import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    maxUserId: 0,
    users: [
      {
        id: 1,
        name: 'first',
        lastname: 'user',
        telephones: [
          {
            id: 0,
            name: 'home',
            details: '001-123-4567',
          },
        ],
      },
      {
        id: 2,
        name: 'second',
        lastname: 'user',
        telephones: [
          {
            id: 0,
            name: 'home',
            details: '002-123-4567',
          },
        ],
      },
      {
        id: 3,
        name: 'second',
        lastname: 'user',
        telephones: [
          {
            id: 0,
            name: 'home',
            details: '003-123-4567',
          },
        ],
      },
    ],
  },
  getters: {
    get(state, getters) {
      return state.users;
    },
    getID: (state) => (id: number | string) => {
      return state.users.find((user) => user.id == id);
    },
    // getID(state, getters) {
    //   return function(id: number | string) {
    //     return state.users.find( (user) => user.id == id);
    //   };
    // },
  },
  mutations: {
    setMaxUserId(state, max){
      state.maxUserId = max
    },
    delete(state, id) {
      state.users =  state.users.filter((user) => user.id != id);
      // var newUserGroup = state.users.filter(user => user.id == id)
      // state.users = newUserGroup
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
    add(state, newUser) {
      newUser.id = ( state.maxUserId =+ 1 )
      state.users.push(newUser)
    },
  },
  actions: {
  },
  modules: {
  },
});
