<template>
  <div class="login-page">
    <div v-if='logister'>
      <form @submit.prevent="userLogin">
        <input type="text" name="email" id="email" v-model="login.email" placeholder='email' require>
        <input type="password" name="password" id="password" v-model="login.password" placeholder='password' require>
        <button type="submit">LOGIN</button>
      </form>
      <button type='' @click="regLog">Register</button>
    </div>
    <div v-if='!logister'>
      <form @submit.prevent="userRegister">
        <input type="text" name="email" id="email" v-model="register.email" placeholder='email' require>
        <input type="text" name="name" id="name" v-model="register.name" placeholder='User Name' require>
        <input type="password" name="password" id="password" v-model="register.password" placeholder='password' require>
        <button type="submit">REGISTER</button>
      </form>
      <button type='' @click="regLog">Login</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    mounted() {
      this.$store.dispatch('authenticate')
    },
    data() {
      return {
        logister: true,
        login: {
          email: '',
          password: ''
        },
        register: {
          email: '',
          name: '',
          password: ''
        }
      }
    },
    computed: {},
    methods: {
      userLogin() {
        this.$store.dispatch('login', this.login)
      },
      userRegister() {
        this.$store.dispatch('register', this.register)
      },
      regLog() {
        this.logister = !this.logister
      }
    }
  }
</script>

<style scoped>
   .container-fluid{
    background: -webkit-linear-gradient( #791929,#af273d)
  }
  .nav-item{
    color: #384259;
   margin-right:1rem
  }
  .btn{
    margin-right:1rem;
    border-radius:1rem 5rem 1rem 2em;
    background: #c4edde;
    border: solid .5rem #384259 ;
    
  }
</style>