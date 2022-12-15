import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    token: localStorage.getItem('token') || '',
    role: localStorage.getItem('role') || '',
  },
  mutations: {
    SET_USERS_TO_STATE: (state, users) => {
      state.users = users;
    },
    SET_USERS: (state, item) => {
      let user = {
        ...item
      }
      state.users.items.push(user);
    },

  },
  actions: {
    async GET_USERS_FROM_API({
      commit
    }) {
      try {
        const users = await axios('http://localhost:3000/users', {
          method: "GET"
        })
        commit('SET_USERS_TO_STATE', users.data)
        return users
      } catch (error) {
        console.log(error)
        return error
      }
    },
    async ADD_NEW_USER({
      commit
    }, item) {
      const response = await axios.post(' http://localhost:3000/users', item);
      commit('SET_USERS', response.data)
    },
  },
  getters: {
    USERS(state) {
      return state.users
    }
  }

})