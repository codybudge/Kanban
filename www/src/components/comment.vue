<template>
  <div class="comment">


<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#' + taskId">
    New Comment
   </button>

   <!-- Modal -->
   <div class="modal fade" :id="taskId" tabindex="-1" role="dialog" aria-labelledby="TaskModalLabel" aria-hidden="true">
     <div class="modal-dialog" role="document">
       <div class="modal-content">
         <div class="modal-header">
           <h5 class="modal-title" id="TaskModalLabel">New Comment</h5>
           <button type="button" class="close" data-dismiss="modal" aria-label="Close">
             <span aria-hidden="true">&times;</span>
           </button>
         </div>
         <div class="modal-body">
            <form @submit.prevent="addComment(newComment)">
                <input type="text" v-model="newComment.title">
                <button class="btn" type="submit">Create Comment</button>
              </form> 
         </div>
         <div class="modal-footer">
           <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
           
         </div>
       </div>
     </div>
   </div>




    <div v-for="comment in comments">
      comment: {{comment.title}}
      <button class="btn" @click="deleteComment(comment)">X</i></button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Comment',
    mounted(){
      this.$store.dispatch('getComments', this.taskId)
    },
    data() {
      return {
        newComment: {
          title: '',
          body: '',
          userName: this.$store.state.user.name,
          userId: this.$store.state.user._id,
          boardId: this.$store.state.currentBoard._id,
          listId: this.listId,
          taskId: this.taskId
        }

      }
    },
    computed: {
      comments() {
        return this.$store.state.commentObj[this.taskId]
      }
    },
    methods: {
      getComments() {
        this.$store.dispatch('getComments', this.taskId)
      },

      addComment(comment) {
        var theComment = JSON.parse(JSON.stringify(comment))
        this.newComment.title = ''
        this.newComment.body = ''
        this.$store.dispatch('addComment', theComment)
      },

      deleteComment(comment) {
        this.$store.dispatch('deleteComment', comment)
      }
    },
    props: {
      taskId: {
        type: String,
        required: true
      },
      listId: {
        type: String,
        required: true
      }
    }
  }

</script>

<style scoped>
    .card {
      text-align: center;
      margin-top: 2rem;
      border-radius: 1rem 1rem 1rem 1rem;
      background: -webkit-radial-gradient(#c4edde,#84d3d0);
      color: #384259;
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