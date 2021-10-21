<template>
  <div class="hello">
    TODO - Mostrar Agenda Certa
  </div>
</template>

<script>
import axios from "../services/axios.js"
import agendaCliente from "../components/AgendaClient.vue"
import agendaDoctor from "../components/AgendaDoctor.vue"
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
    isLogged() {
      return this.users.length > 0
    }
  },
  created() {
    this.getAllUsers()
  }
}
</script>