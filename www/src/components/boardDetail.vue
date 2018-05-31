<template>
  <div class="boardDetail container-fluid">
    <h1>{{board.title}}</h1>
    <h5>{{board.body}}</h5>
    <button @click="goHome">Home</button>
    <list></list>

  </div>
</template>

<script>
   import router from '../router'
import list from './list.vue'

  export default {
    name: 'boardDetail',
    components:{
      list,
    },
    data() {
      return {
       

      }
    },
    computed: {
      board(){
        return this.$store.state.currentBoard
      }
    },
    methods: {
      goHome(){
        router.push({name: 'Home'})
      }
    },
    props:{
      
    }
  }

</script>

<style scoped>
    .boardDetail{
      background-color: purple;
    }
  </style>
