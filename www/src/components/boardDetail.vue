<template>
  <div class="boardDetail container-fluid">
    <h1>{{board.title}}</h1>
    <h5>{{board.body}}</h5>
    <list></list>

  </div>
</template>

<script>
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
    methods: {},
    props:{
      
    }
  }

</script>

<style scoped>
    .boardDetail{
      background-color: purple;
    }
  </style>
