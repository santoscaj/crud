import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    maxUserId: 0,
    selectedUserId: 0,
    users: [
      {
        id: 1,
        firstName: 'first',
        lastName: 'user',
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
        firstName: 'second',
        lastName: 'user',
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
        firstName: 'third',
        lastName: 'user',
        telephones: [
          {
            id: 0,
            name: 'home',
            details: '003-123-4567',
          },
          {
            id: 2,
            name: 'work',
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
    getSelectedUser(state, getters){
      return getters.getID(state.selectedUserId)
    },
    getSelectedUserId(state){
      return state.selectedUserId
    },
    getSelectedUserPlainProperties(state, getters){
      var currentUser = getters.getSelectedUser
      if(!currentUser) return 0;

      var userProperties = Object.keys(currentUser)
      return userProperties.filter(prop => {
        if (prop =='id')
          return false
        if(Array.isArray(currentUser[prop]))
          return false
        return true
      } )
    },
    getSelectedUserArrayProperties(state, getters){
      var currentUser = getters.getSelectedUser
      if(!currentUser) return 0;

      var userProperties = Object.keys(currentUser)

      return userProperties.filter(prop => Array.isArray(currentUser[prop]) ).map(arrProp=>{
        var label = arrProp.charAt(0).toUpperCase() + arrProp.slice(1,)
        label = (label.match(/[A-Z]([a-z]|[0-9])*/g) || ['']).join(' ')
        return { name:arrProp, label, values: (Object.keys(currentUser[arrProp]))}
      })
    }
  },
  mutations: {
    setMaxUserId(state, max){
      state.maxUserId = max
    },
    setSeletedUser(state,id){
      state.selectedUserId = id
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
