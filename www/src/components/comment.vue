<template>
  <div class="comment">
    <div v-for="comment in comments">
      comment: {{comment.title}}
      <button class="btn-danger" @click="deleteComment(comment)">x</button>
    </div>
    <form @submit.prevent="addComment(newComment)">
      <input type="text" v-model="newComment.title">
      <button class="btn-info" type="submit">comment</button>
    </form>
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