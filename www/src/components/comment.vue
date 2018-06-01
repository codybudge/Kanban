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
                <button type="submit">Create Comment</button>
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
      <button class="btn-danger" @click="deleteComment(comment)">x</button>
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

</script >

<style scoped>
  .comment{
    background-color: rgb(184, 91, 57);
  }
</style>