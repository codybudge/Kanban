<template>
  <div class="">



    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#BoardModal">
     New Board
    </button>

    <!-- Modal -->
    <div class="modal fade" id="BoardModal" tabindex="-1" role="dialog" aria-labelledby="BoardModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="BoardModalLabel">New Board</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
              <form @submit.prevent="createBoard(newBoard)">
                  <input type="text" v-model="newBoard.title" placeholder="Title" required>
                  <br>
                  <textarea v-model="newBoard.body" placeholder="Your board description here" cols="22" rows="5"></textarea>
                  <br>
                  <button type="submit" >Submit</button>
                </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            
          </div>
        </div>
      </div>
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
    mounted() {
      this.getBoards()
    },
    data() {
      return {
        newBoard: {
          title: '',
          body: '',
          userName: this.$store.state.user.name,
          userId: this.$store.state.user._id
        }

      }
    },
    computed: {
      curentUser() {
        return this.$store.state.user
      },
      boards() {
        return this.$store.state.boards
      }
    },
    methods: {

      createBoard(board) {
        var theBoard = JSON.parse(JSON.stringify(board))
        this.$store.dispatch('newBoard', theBoard)
        this.newBoard.title = ''
        this.newBoard.body = ''
      },
      getBoards() {
        this.$store.dispatch('getBoards')
      },
      deleteBoard(boardId) {
        this.$store.dispatch('deleteBoard', boardId)
      },
      boardDetail(board) {
        this.$store.dispatch('setBoard', board)
        router.push({ name: 'BoardDetail' })
      }
    }
  }

</script>

<style>
</style>