<template>
  <div class="boardDetail container-fluid">
    {{board.title}}
{{board._id}}
  </div>
</template>

<script>
  export default {
    name: 'boardDetail',
    data() {
      return {
       board: this.$route.params.board

      }
    },
    computed: {},
    methods: {},
    props:{
      
    }
  }

</script>

<style>


</style>
