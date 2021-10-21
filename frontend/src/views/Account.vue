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
      this.users = await axios.get('allUsers')
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
