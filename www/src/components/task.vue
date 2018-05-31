<template>
  <div class="task">
    <form @submit.prevent="addTask(newTask)">
      <input type="text" v-model="newTask.title">
      <button type="submit">Create Task</button>
    </form>
<div v-for="task in tasks">
{{task.title}}

<comments :listId="listId" :taskId="task._id"></comments>
<button @click="deleteTask(task)">X</button>
</div>
  </div>
</template>

<script>
import comments from "./comment.vue"

  export default {
    name: 'Task',
    mounted(){
      this.$store.dispatch('getTasks', this.listId)
    },
    components:{
      comments
    },
    props: {
      listId:{
        type: String,
        required: true
      }
    },
    data() {
      return {
        newTask:{
          title: '',
          body: '',
          userName: this.$store.state.user.name,
          userId: this.$store.state.user._id,
          boardId: this.$store.state.currentBoard._id,
          listId: this.listId
        }

      }
    },
    computed: {
      tasks(){
        return this.$store.state.taskObj[this.listId]
      }
    },
    methods: {
      getTasks(){
        this.$store.dispatch('getTasks', this.listId)
      },
      addTask(newTask){
        this.$store.dispatch('addTask', newTask)
      },
      deleteTask(task){
        this.$store.dispatch('deleteTask', task)
      }
    },
   
  }

</script>

<style scoped>
    .task{
      background-color:lightblue;
    }
  </style>
