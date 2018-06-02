<template>
  <div class="list">


<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ListModal">
    New List
   </button>

   <!-- Modal -->
   <div class="modal fade" id="ListModal" tabindex="-1" role="dialog" aria-labelledby="ListModalLabel" aria-hidden="true">
     <div class="modal-dialog" role="document">
       <div class="modal-content">
         <div class="modal-header">
           <h5 class="modal-title" id="ListModalLabel">New Task</h5>
           <button type="button" class="close" data-dismiss="modal" aria-label="Close">
             <span aria-hidden="true">&times;</span>
           </button>
          </div>
          
         <div class="modal-body">
            <form @submit.prevent="addList(newList)">
                <input class="title" type="text" v-model="newList.title" placeholder="Title" required>
                <br>
                <textarea class="textarea" v-model="newList.body" placeholder="Your List description here" cols="22" rows="5"></textarea>
                <br>
                <button class="btn" type="submit">Submit</button>
              </form>
         </div>
         <div class="modal-footer">
           <button type="button" class="btn" data-dismiss="modal">Close</button>
           
         </div>
       </div>
     </div>
   </div>
   <div class="card-columns">
    <div class="card list" v-for="list in lists">
      <div class="card-title">
        
        <h4>{{list.title}}</h4>
        
      </div>
      <div class="card-body">
        <h5>{{list.body}}</h5>
        <hr>
        <tasks :listId="list._id"></tasks>
      </div>
      <div class="card-text">
        <hr>
        <p>{{list.userName}}</p>
        <button class="btn" @click="deleteList(list._id)">Destroy</button>
      </div>
      </div>
    </div>


  </div>
</template>

<script>
import tasks from './task.vue'

  export default {
    name: 'List',
    components:{
      tasks,
    },
    mounted() {
      this.getLists()
    },
    data() {
      return {
        newList: {
          title: '',
          body: '',
          userName: this.$store.state.user.name,
          userId: this.$store.state.user._id,
          boardId: this.$store.state.currentBoard._id
        }

      }
    },
    computed: {
      board() {
        return this.$store.state.currentBoard
      },
      lists() {
        return this.$store.state.lists
      }
    },
    methods: {
      getLists() {
        this.$store.dispatch('getLists')
      },

      addList(list) {
        var theList = JSON.parse(JSON.stringify(list))
        this.$store.dispatch('addList', theList)
        this.newList.title = ''
        this.newList.body = ''
      },
      deleteList(listId) {
        this.$store.dispatch('deleteList', listId)
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