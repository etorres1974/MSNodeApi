<template>
  <div class="hello">
    <div v-if="isLogged">
      <agendaCliente v-if="isClient"></agendaCliente>
      <agendaDoctor v-if="isDoctor"></agendaDoctor>
    </div>
    <div v-else>
        Logue primeiro 
    </div>
  </div>
</template>

<script>
import axios from "../services/axios.js"
import agendaCliente from "../components/AgendaClient.vue"
import agendaDoctor from "../components/AgendaDoctor.vue"
import cache from "../services/cache"
export default {
  name: 'Agenda',
  components:{
    agendaCliente,
    agendaDoctor
  },
  data () {
    return {
      title: 'Agenda',
      users : []
    }
  },
  methods: {
    async getAllUsers(){
      this.users = await axios.get('allUsers')
    }
  },
  computed:{
    isLogged(){
        this.updated
        return cache.getUser() != null
    },
    isClient(){
      return cache.isUserClient()
    },
    isDoctor(){
      return cache.isUserDoctor()
    },
    getSpec(){
      return this.getSpec()
    }

  },
  created() {
    this.getAllUsers()
  }
}
</script>