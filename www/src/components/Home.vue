<template>
  <div class="container-fluid Home">

  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      board:'',
      boardId: ''
    }
  },
  computed:{
    boards(){
      return this.$store.state.boards
    }
  },
  methods:{
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
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
