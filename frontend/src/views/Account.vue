<template>
  <div class="hello">
    <div v-if="isLogged"> 
        User
        {{user}}
        <br>
        Spec
        {{spec}}
        <v-btn @click="logout"> Logout </v-btn>
    </div>
    <div v-else> 
      <LoginRegisterForm/>
    </div>
  </div>
</template>

<script>
import axios from "../services/axios.js"
import cache from "../services/cache"
import LoginRegisterForm from "../components/LoginRegisterForm.vue"
import EventBus from "../services/event-bus"
export default {
  name: 'Account',
  components:{
    LoginRegisterForm
  },
  data () {
    return {
      title: 'Account',
      update : 0 //Hack
    }
  },
  methods: {
    async getAllUsers(){
      this.users = await axios.get('allUsers')
    },
    logout(){
      this.update++
      EventBus.$emit('user-logout')
    }
  },
  computed : {
      isLogged(){ this.update
        return cache.getUser() != null
      },
      user(){
        return cache.getUser()
      },
      spec(){
        return cache.getSpec()
      }

  },
  created() {
    this.getAllUsers()
  }
}
</script>
