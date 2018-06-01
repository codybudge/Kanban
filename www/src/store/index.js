import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from "../router"

var production = !window.location.host.includes('localhost');
var baseUrl = production ? '//ej-kanban.herokuapp.com/' : '//localhost:3000/';

let api = axios.create({
  baseURL: baseUrl,
  timeout: 3000,
  withCredentials: true
})

let auth = axios.create({
  baseURL: baseUrl + 'auth/',
  timeout: 3000,
  withCredentials: true
})

vue.use(vuex)

export default new vuex.Store({
  state: {
    user: {},
    boards: [],
    currentBoard: {},
    lists: [],
    taskObj: {},
    commentObj: {}

  },
  mutations: {
    setBoards(state, boards) {
      state.boards = boards
    },
    setBoard(state, board) {
      vue.set(state, 'currentBoard', board)
      state.currentBoard = board
    },
    setUser(state, user) {
      state.user = user
    },
    deleteUser(state) {
      state.user = {}
    },
    setLists(state, lists) {
      state.lists = lists
    },
    setTasks(state, payload) {
      //finds and removes duplicate tasks!
      for (let key in state.taskObj) {
        for (let i = 0; i < state.taskObj[key].length; i++) {
          const element = state.taskObj[key][i];
          for (let x = 0; x < payload.data.length; x++) {
            const task = payload.data[x];
            if (element._id == task._id) {
              state.taskObj[key].splice(i, 1)
            }
          }
        }
      }
        vue.set(state.taskObj, payload.listId, payload.data)
      

    },
    setComments(state, payload) {
        vue.set(state.commentObj, payload.taskId, payload.data)
      }
  },
  actions: {
    //AUTH STUFF-------------------------------------------------------------------
    login({ commit, dispatch }, loginCredentials) {
      auth.post('login', loginCredentials)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'Home' })
        })
    },

    logout({ commit, dispatch }) {
      auth.delete('logout', )
        .then(res => {
          console.log(res)
          commit('deleteUser')
          router.push({ name: 'Login' })
        })
        .catch(res => {
          console.log(res.data)
        })
    },

    register({ commit, dispatch }, userData) {
      console.log(userData)
      auth.post('/register/', userData)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'Home' })
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

    //app stuff-----------------------------------------------------------------------------

    //board stuff++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //get all boards
    getBoards({ dispatch, commit, state }, ) {
      console.log(state.user._id)
      api.get("/api/boards/" + state.user._id)
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
          dispatch('getBoards')
          //real content here
        })
    },

    //delete board  currrently deleting but returning 400
    deleteBoard({ dispatch, commit, state }, boardId) {
      api.delete('/api/boards/' + boardId)
        .then(res => {
          console.log("deleted")
          dispatch('getBoards')
          // commit('setBoard', res.data)
        }).catch(err => console.log(err))
    },

    setBoard({ dispatch, commit }, board) {
      commit('setBoard', board)
    },

    //list stuff +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    getLists({ dispatch, commit, state }) {
      api.get('/api/lists/' + state.currentBoard._id)
        .then(res => {
          console.log(res)
          commit('setLists', res.data)
        })
        .catch(err => console.log(err))
    },

    addList({ dispatch, commit, state }, newList) {
      api.post('/api/lists/', newList)
        .then(res => {
          // commit('setLists', res.data)
          dispatch('getLists')
        })
        .catch(err => console.log(err))
    },

    deleteList({ dispatch, commit, state }, listId) {
      api.delete('/api/lists/' + listId)
        .then(res => {
          console.log("deleted")
          dispatch('getLists')
          // commit('setBoard', res.data)
        }).catch(err => console.log(err))
    },

    editList({ dispatch, commit, state }, list) {
      api.put('/api/lists/' + list._id)
        .then(res => {
          dispatch('getlists')
        }).catch(err => console.log(err))
    },

    //Task stuff ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    getTasks({ dispatch, commit, state }, listId) {
      api.get('/api/tasks/' + listId)
        .then(res => {
          console.log(res)
          commit('setTasks', {listId: listId , data: res.data})
          console.log("objet" + state.taskObj[res.data.listId])
        })
        .catch(err => console.log(err))
    },

    addTask({ dispatch, commit, state }, newTask) {
      api.post('/api/tasks/', newTask)
        .then(res => {
          // commit('setLists', res.data)
          dispatch('getTasks', newTask.listId)
        })
        .catch(err => console.log(err))
    },

    deleteTask({ dispatch, commit, state }, task) {
      api.delete('/api/tasks/' + task._id)
        .then(res => {
          console.log("deleted")
          dispatch('getTasks', task.listId)
          // commit('setBoard', res.data)
        }).catch(err => console.log(err))
    },

    editTask({ dispatch, commit, state }, task) {
      console.log(task)
      api.put('/api/tasks/' + task._id, task)
        .then(res => {
          console.log(res)
          dispatch('getTasks', task.listId)
        }).catch(err => console.log(err))
    },

    //Comment Stuff ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    getComments({ dispatch, commit, state }, taskId) {
      api.get('/api/comments/' + taskId)
        .then(res => {
          console.log(res)
          commit('setComments', {taskId: taskId ,data: res.data})

        })
        .catch(err => console.log(err))
    },

    addComment({ dispatch, commit, state }, newComment) {
      api.post('/api/comments/', newComment)
        .then(res => {
          // commit('setLists', res.data)
          dispatch('getComments', newComment.taskId)
        })
        .catch(err => console.log(err))
    },

    deleteComment({ dispatch, commit, state }, comment) {
      api.delete('/api/comments/' + comment._id)
        .then(res => {
          console.log("deleted")
          dispatch('getComments', comment.taskId)
          // commit('setBoard', res.data)
        }).catch(err => console.log(err))
    },

  }
})