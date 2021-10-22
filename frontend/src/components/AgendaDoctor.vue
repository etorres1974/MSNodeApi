<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    <consultascalendar></consultascalendar>
  </div>
</template>

<script>
import axios from "../services/axios.js"
import consultascalendar from "../components/ConsultasCalendar.vue"

export default {
  title: 'Agenda Médico',
  components:{
    consultascalendar
  },
  data () {
    return {
      title: 'Agenda Médico',
      products : []
    }
  },
  methods: {
    async getAllProducts(){
      //this.products = await axios.get('allProducts')
    }
  },
  created() {
    this.getAllProducts()
  }
}
</script>
