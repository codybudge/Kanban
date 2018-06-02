<template>
  <div class="container-fluid">



    <!-- Button trigger modal -->
    <button type="button" class="btn" data-toggle="modal" data-target="#BoardModal">
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
              <input class="title" type="text" v-model="newBoard.title" placeholder="Title" required>
              <br>
              <textarea class="textarea" v-model="newBoard.body" placeholder="Your board description here" cols="22" rows="5"></textarea>
              <br>
              <button class="btn" type="submit">Submit</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

          </div>
        </div>
      </div>
    </div>
    <!--end of modal-->
    <div class="card-columns">
      <div class="card" v-for="board in boards">
        <div class="card-title">
          <h4>{{board.title}}</h4>
        </div>
        <div class="card-body">
          <h5>{{board.body}}</h5>
          <button class="btn" @click="boardDetail(board)">Go to Board</button>
        </div>
        <div class="card-text">
          <p>{{board.userName}}</p>
          <button class="btn" @click="deleteBoard(board._id)">Destroy</button>
        </div>
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

<style scoped>
  .container-fluid{
    background: -webkit-linear-gradient(#7e1a2a,#af273d);
  }
  .card {
    text-align: center;
    margin-top: 2rem;
    border-radius: 1rem 5rem 1rem 2rem;
    background: -webkit-radial-gradient(#c4edde,#84d3d0);
    color: #384259;
  }
  .card-title{
    margin-top: 1.5rem;
  }
  .card-text:last-child{
    margin-bottom: 1rem
  }
  .btn{
    margin-top: 1.5rem;
    margin-right:1rem;
    border-radius: 1rem;
    background: #c4edde;
    border: solid .5rem #7ac7c4;
    color:#384259;
    font-weight: 30px
  }
  .modal-header{
    background: #384259
  }
  .modal-body{
  background: #384259
  }
  .modal-footer{
background: #384259
  }
  .textarea{
    background: #7ac7c4
  }
  .title{
    background: #c4edde
  }
</style>