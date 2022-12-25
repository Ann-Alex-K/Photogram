import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    posts: [],
    token: localStorage.getItem('token') || '',
    role: localStorage.getItem('role') || '',
  },
  mutations: {
    SET_USERS_TO_STATE: (state, users) => {
      state.users = users;
    },
    SET_POSTS_TO_STATE: (state, posts) => {
      state.posts = posts.reverse();
    },
    SET_TOKEN_TO_STATE: (state, token) => {
      state.token = token;
    },
    SET_ROLE_TO_STATE: (state, role) => {
      state.role = role;
    },
    REMOVE_USER: (state) => {
      state.token = '';
      state.role = '';
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
    async GET_POSTS_FROM_API({
      commit
    }) {
      try {
        const posts = await axios('http://localhost:3000/posts', {
          method: "GET"
        })
        commit('SET_POSTS_TO_STATE', posts.data)
        return posts
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
    GET_TOKEN({
      commit
    }) {
      let token = localStorage.getItem('token');
        commit('SET_TOKEN_TO_STATE', token)
        return token
      },
      GET_ROLE({
        commit
      }) {
        let role = localStorage.getItem('role');
          commit('SET_ROLE_TO_STATE', role)
          return role
        },
        LOGOUT({
          commit
        }) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
            commit('REMOVE_USER')
          },
  },
  getters: {
    USERS(state) {
      return state.users
    },
    POSTS(state) {
      return state.posts;
    },
    TOKEN(state) {
      return state.token
    },
    ROLE(state) {
      return state.role
    }
  }

})