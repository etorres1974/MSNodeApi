<template>
  <div class="hello">
    <div v-if="isLogged">
      <agenda-cliente></agenda-cliente>
      <agenda-doctor></agenda-doctor>
    </div>
    <div v-else>
        Logue primeiro 
    </div>
  </div>
</template>

<script>
import axios from "../services/axios.js"
import agenda_cliente from "../components/AgendaClient.vue"
import agenda_doctor from "../components/AgendaDoctor.vue"
import cache from "../services/cache"
export default {
  name: 'Agenda',
  components:{
    agenda_cliente,
    agenda_doctor
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
      return cache.isLogged
    }
  },
  created() {
    this.getAllUsers()
  }
}
</script>