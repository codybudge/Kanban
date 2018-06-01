<template>
  <div class="list">

    <form @submit.prevent="addList(newList)" v-if="clicked">
      <input type="text" v-model="newList.title" placeholder="Title" required>
      <br>
      <textarea v-model="newList.body" placeholder="Your List description here" cols="22" rows="5"></textarea>
      <br>
      <button type="submit">Submit</button>
    </form>
    <button @click="click">new List</button>

    <div class="card list" v-for="list in lists">
      <div class="card-title">
        <h4>{{list.title}}</h4>
      </div>
      <div class="card-body">
        <h5>{{list.body}}</h5>
        tasks here
        <tasks :listId="list._id"></tasks>
      </div>
      <div class="card-text">
        <p>{{list.userName}}</p>
        <button @click="deleteList(list._id)">Destroy</button>
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
        clicked: false,
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
      click() {
        this.clicked = !this.clicked
        this.newList.title = ''
        this.newList.body = ''
      },
      getLists() {
        this.$store.dispatch('getLists')
      },

      addList(list) {
        var theList = JSON.parse(JSON.stringify(list))
        this.$store.dispatch('addList', theList)
        this.click()
      },
      deleteList(listId) {
        this.$store.dispatch('deleteList', listId)
      }
    }
  }

</script>

<style scoped>
    .list{
      background-color: rgb(66, 133, 66);
    }
  </style>