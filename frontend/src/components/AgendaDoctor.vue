<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    <consultascalendar></consultascalendar>

  </div>
</template>

<script>
import consultascalendar from "../components/ConsultasCalendar.vue"
import EventBus from "../services/event-bus"
import cache from "../services/cache"
import apiAgendaClient from "../services/apiAgendaClient"
export default {
   name: 'AgendaDoctor',
  components:{
    consultascalendar
  },
  data () {
    return {
      title: 'Agenda Médico',
      agenda : {}
    }
  },
  destroyed() {
    this.unregisterListeners()
  },

  methods: {
      registerListeners(){
      EventBus.$on('click-event', payload => {
          console.log("Ageda Doc Event", payload)
      })
      EventBus.$on('click-date', payload => {
          console.log("Agenda Doc date", payload)
      })
  },
  unregisterListeners(){
     EventBus.$on('click-event', payload => {})
     EventBus.$on('click-date', payload => {})
  },
  },
  computed: {
    isDoctor(){return cache.isUserDoctor()},
    user() { return cache.getUser() }
  },
}
</script>
