import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from "../router"


let api = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 3000,
  withCredentials: true
})

let auth = axios.create({
  baseURL: 'http://localhost:3000/auth/',
  timeout: 3000,
  withCredentials: true
})

vue.use(vuex)

export default new vuex.Store({
  state: {
    user: {},
    boards: [],


  },
  mutations: {
    setBoards(state, boards) {
      state.boards = boards
    },
    setUser(state, user) {
      state.user = user
    },
    deleteUser(state) {
      state.user = {}
    }
  },
  actions: {
    //AUTH STUFF
    login({ commit, dispatch }, loginCredentials) {
      auth.post('login', loginCredentials)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'Home' })
        })
    },

    logout({ commit, dispatch }) {
     auth.delete('logout',)
     .then(res=>{
       console.log(res)
       commit('deleteUser')
       router.push({name: 'Login'})
     })
     .catch(res => {
      console.log(res.data)
    })
    },

    register({ commit, dispatch }, userData) {
      console.log(userData)
      auth.post('/register/', userData)
      .then(res =>{
        commit('setUser', res.data)
        router.push({name: 'Home'})
      })
      .catch(res => {
        console.log(res.data)
      })
    },

    authenticate({ commit, dispatch }) {
      api.get('/authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'Home' })
        })
        .catch(res => {
          console.log(res.data)
        })
    },

    //app stuff
    //get all boards
    getBoards({ dispatch, commit }, ) {
      api.get("/api/boards")
        .then(res => {
          console.log(res)
          commit('setBoards', res.data)
        })
        .catch(err => console.log(err))
    },

    //edit board
    editBoard({ dispatch, commit, state }, board) {
      api.put('/api/boards/' + board._id, board)
        .then(res => {
          console.log(res)
          // commit('setBoard', res.data)
        }).catch(err => console.log(err))
    },

    //create New board
    newBoard({ dispatch, commit, state }, board) {
      api.post('/api/boards/', board)
        .then(res => {
          console.log(res)
          //real content here
        })
    },

    //delete board  currrently deleting but returning 400
    deleteBoard({ dispatch, commit, state }, boardId) {
      api.delete('/api/boards/' + boardId)
        .then(res => {
          console.log("deleted")
          // commit('setBoard', res.data)
        }).catch(err => console.log(err))
    },

  }
})