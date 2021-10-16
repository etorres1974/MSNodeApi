<template>
  <div class="hello">
    <div v-if="isLogged"> Logado {{users}}</div>
    <div v-else> 
      <LoginRegisterForm/>
    </div>
  </div>
</template>

<script>
import axios from "../services/axios.js"
import LoginRegisterForm from "../components/LoginRegisterForm.vue"
export default {
  name: 'Account',
  components:{
    LoginRegisterForm
  },
  data () {
    return {
      title: 'Account',
      users : []
    }
  },
  methods: {
    async getAllUsers(){
      //this.users = await axios.get('allUsers')
    }
  },
  computed:{
    isLogged() {
      return this.users.length > 0
    }
  },
  created() {
    this.getAllUsers()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
