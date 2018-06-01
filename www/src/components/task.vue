<template>
  <div class="task">

<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#' + listId" :data-listId="listId">
    New Task
   </button>

   <!-- Modal -->
   <div class="modal fade" :id="listId" tabindex="-1" role="dialog" aria-labelledby="TaskModalLabel" aria-hidden="true">
     <div class="modal-dialog" role="document">
       <div class="modal-content">
         <div class="modal-header">
           <h5 class="modal-title" id="TaskModalLabel">New Task</h5>
           <button type="button" class="close" data-dismiss="modal" aria-label="Close">
             <span aria-hidden="true">&times;</span>
           </button>
         </div>
         <div class="modal-body">
            <form @submit.prevent="addTask(newTask)">
                <input type="text" v-model="newTask.title">
                <button type="submit">Create Task</button>
              </form> 
         </div>
         <div class="modal-footer">
           <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
           
         </div>
       </div>
     </div>
   </div>

<div v-for="task in tasks">
{{task.title}}
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownlist" data-toggle="dropdown">Change List</button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <!--  -->
      <a  v-for="list in lists" @click="moveTask(list._id, task)" class="dropdown-item">{{list.title}}</a>
    
</div>
</div>
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
      this.getLists()

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
        },
        editedTask:{}

      }
    },
    computed: {
      tasks(){
        return this.$store.state.taskObj[this.listId]
      },
      lists(){
        return this.$store.state.lists
      }
    },
    methods: {
      getTasks(){
        this.$store.dispatch('getTasks', this.listId)
      },
      addTask(task){
        var theTask = JSON.parse(JSON.stringify(task))
        this.newTask.title = ''
        this.newTask.body = ''
        this.$store.dispatch('addTask', theTask)
      },
      deleteTask(task){
        this.$store.dispatch('deleteTask', task)
      },
      getLists(){
        this.$store.dispatch('getLists')
      },
      moveTask(listId, task){
        let editedTask = JSON.parse(JSON.stringify(task))
        editedTask.listId = listId
        this.$store.dispatch('editTask', editedTask)
      }
      // editTask(editedTask, listId){
      //   this.$store.dispatch('deleteTask', editedTask)
      // }
    },
   
  }

</script>

<style scoped>
    .task{
      background-color:lightblue;
    }
  </style>
