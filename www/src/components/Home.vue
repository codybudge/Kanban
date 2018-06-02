<template>
  <div class="container-fluid Home"> 
    <div class="nav justify-content-end">
      <h4 class="nav-item">{{curentUser.name}}</h4>
      <button class="btn" @click="logout">logout</button>
    </div>
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
  .nav{
    background: #7ac7c4;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-right:1rem;
    border-radius: 1rem 5rem .5rem 2rem;
    font-family: 'Raleway', sans-serif;
  }
  .container-fluid{
    background: -webkit-linear-gradient( #791929,#af273d);
    font-family: 'Raleway', sans-serif;
  }
  .nav-item{
    color: #384259;
   margin-right:1rem
  }
  .btn{
    margin-right:1rem;
    border-radius:1rem 5rem 1rem 2em;
    background: #c4edde;
    border: solid .5rem #384259 ;
    
  }

</style>