<template>
  <div class="container-fluid Home">
    {{curentUser.name}}
    <button @click="logout">logout</button>
    <board></board>
  </div>
</template>

<script>

  import router from '../router'
  import board from './board.vue'

  export default {
    name: 'Home',
    mounted() {
      if (!this.$store.state.user._id) {
        router.push({ name: 'Login' })
      }
    },
    components: {
      board
    },
    data() {
      return {
        board: '',
        boardId: ''
      }
  },
    computed: {
      boards() {
        return this.$store.state.boards
      },
      curentUser() {
        return this.$store.state.user
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
      },
      getBoards() {
        this.$store.dispatch('getBoards')
      },

      editBoard(changedBoard) {
        this.$store.dispatch('editBoard', JSON.parse(changedBoard))//remove JSON.parse
      },

      newBoard(newBoard) {
        this.$store.dispatch('newBoard', JSON.parse(newBoard))//remove JSON.parse
      },

      deleteBoard(boardId) {
        this.$store.dispatch('deleteBoard', boardId)
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>