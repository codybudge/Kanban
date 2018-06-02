<template>
  <div class="boardDetail container-fluid">
    <h1>{{board.title}}</h1>
    <h5>{{board.body}}</h5>
    <button class="btn" @click="goHome">Home</button>
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
      background: -webkit-linear-gradient(#7e1a2a,#af273d);
      padding-bottom: 38.4%
        
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
  </style>
