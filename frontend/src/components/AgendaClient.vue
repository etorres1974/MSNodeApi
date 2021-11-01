<template>
  <div class="hello ">
    <h1>{{ title }}</h1> 
    <div v-if ="!especialidadeSelecionada"> <h4>
      Selecione uma especialidade </h4>
    </div>
    <v-select  
    v-model="especialidadeSelecionada"
    :items="especialidadesDisponiveis"
    outlined label="Especialidades Disponíveis"/>
    
   <div v-if ="especialidadeSelecionada" >
    <consultascalendar v-if="false"/>
    <br>
      <v-row  >
    <v-date-picker
      v-model="min"
      class="ma-4"
    />
    <v-date-picker
      v-model="max"
      class="ma-4"
    />
    </v-row>
    
    <v-btn class="my-4" @click="consultarProfissionais"> Consultar Profissionais </v-btn>
     
    <v-select 
     outlined 
     v-model="selectedDoctor"
     :items="doctorsDisponiveis"
     item-text="name"
     return-object
     label="Profissionais Disponíveis" />
     
    
    <div v-if="selectedDoctor">
    <v-select 
     outlined 
     
     v-model="horarioSelecionado"
     :items="parsedLivres"
     
     label="Horários Disponíveis" />
     
    <v-btn @click="marcarConsulta"> Marcar Consulta </v-btn>
    </div>
    </div>
    
  </div>
</template>

<script>
import consultascalendar from "../components/ConsultasCalendar.vue";
import cache from "../services/cache";
import EventBus from "../services/event-bus"
import apiAgendaClient from "../services/apiAgendaClient"
import apiUserClient from "../services/apiUserClient"
import Vtoast from './vtoast.vue';
export default {
  name: "AgendaClient",
  components: {
    consultascalendar,
    Vtoast,
  },
  data() {
    return {
      title: "Agenda Client",
      diaSelecionado : "",
      horarioSelecionado: "",
      especialidadeSelecionada: "",
      especialidadesDisponiveis : [],
      diasLivres : [],
      selectedDoctor: null,
      min : "",
      max : "",
      allDoctors : ['1'],
      doctorsDisponiveis : []
    };
  },
  mounted(){
    this.registerListeners()
    this.atualizarEspecialidadesDisponiveis()
    this.fetchAllDoctors()
  },
  destroyed() {
    this.unregisterListeners()
  },
  methods: {
    async fetchAllDoctors(){
      const res = await apiUserClient.getAllDoctors()
      console.log("fe all doc", res )
      const { doctors } = res.data.data
      this.allDoctors = doctors
    },
    async consultarProfissionais(){
      console.log("Consultar Agenda", this.min, this.max)
      const res = await apiAgendaClient.consultarAgenda(
        this.min,
        this.max,
        this.especialidadeSelecionada
      )
      console.log("Consultar Agenda", res)
      const { livres, ocupadas, todas } = res.data.data.agenda
      const doctorsOcupados = ocupadas.map( (d) => d.doctorId)
      this.doctorsDisponiveis = this.allDoctors.filter( (d) => !doctorsOcupados.includes(d.doctorId))
      this.diasLivres = livres
    },
    async marcarConsulta(){
      const res = await apiAgendaClient.marcarConsulta(
        this.diaSelecionado,
        this.horarioSelecionado,
        this.user.id,
        this.selectedDoctor.id,
        this.especialidadeSelecionada
      )
      console.log("MARCAR CONSULTA", res)
      EventBus.$emit("marcar-consulta", res)
    },
    async atualizarEspecialidadesDisponiveis(){
      const { data } =  await apiAgendaClient.getSpecs()
      console.log("RESSS", data)
      this.especialidadesDisponiveis = data.especs
        
    },
    registerListeners() {
    EventBus.$on("click-event", (payload) => {
      if(this.isClient){
        console.log("Ageda Paciente Event", payload);
      }
    });
    EventBus.$on("click-date", (payload) => {
      if(this.isClient){
        console.log("Agenda Paciente date", payload);
        this.diaSelecionado = payload
        atualizarHorariosDisponiveis()
      }
    });
  },
  unregisterListeners(){
     EventBus.$on('click-event', payload => {})
     EventBus.$on('click-date', payload => {})
  },
  },
  computed: {
    isClient() {
      return cache.isUserClient();
    },
    user(){
      return cache.getUser()
    },
    hoje(){
      var x = new Date()
      return x.getFullYear() + "-" + x.getMonth() + "-" + x.getDate()
    },
    parsedLivres(){
      return this.diasLivres.map( (it) => new Date(it).toGMTString())
    }
  },
};
</script>
