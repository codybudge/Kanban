<template>
  <div class="">
    <button @click="click">New Board</button>
    <div v-if="clicked">

      <form @submit.prevent="createBoard(newBoard)">
        <input type="text" v-model="newBoard.title" placeholder="Title" required>
        <br>
        <textarea v-model="newBoard.body" placeholder="Your board description here"cols="22" rows="5"></textarea>
        <br>
        <button type="submit">Submit</button>
      </form>
    </div>
    <div class="card" v-for="board in boards">
      <div class="card-title">
        <h4>{{board.title}}</h4>
      </div>
        <div class="card-body">
          <h5>{{board.body}}</h5>
          <button @click="boardDetail(board)">Go to Board</button>
        </div>
        <div class="card-text">
          <p>{{board.userName}}</p>
          <button @click="deleteBoard(board._id)">Destroy</button>
        </div>
        
      </div>
  </div>
</template>

<script>

 import router from '../router'

  export default {
    name: 'Board',
    mounted(){
      this.getBoards()
    },
    data() {
      return {
        clicked: false,
        newBoard: {
          title: '',
          body: '',
          userName: this.$store.state.user.name,
          userId: this.$store.state.user._id
        }

      }
    },
    computed: {
      curentUser(){
        return this.$store.state.user
      },
      boards(){
        return this.$store.state.boards
      }
    },
    methods: {
      click() {
        this.clicked = !this.clicked
      },
      createBoard(board){

        this.$store.dispatch('newBoard', board)
        this.click()
        
        //messes up the title(deletes it)
        // this.newBoard.title = ''
        // this.newBoard.body = ''
      },
      getBoards() {
        this.$store.dispatch('getBoards')
      },
      deleteBoard(boardId){
        this.$store.dispatch('deleteBoard', boardId)
      }, 
      boardDetail(board){
        this.$store.dispatch('setBoard', board)
        router.push({name: 'BoardDetail'})
      }
    }
  }

</script>

<style>


</style>
