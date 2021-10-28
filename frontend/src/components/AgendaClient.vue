<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    <consultascalendar></consultascalendar>
    <br>
    <v-text-field outlined disabled label="Dia selecionado" v-model="diaSelecionado"></v-text-field>
    <v-select  
    v-model="especialidadeSelecionada"
    :items="especialidadesDisponiveis"
    outlined label="Especialidades Disponíveis"></v-select>
    <v-select 
     outlined 
     v-model="horarioSelecionado"
     :items="todosHorarios"
     label="Horários Disponíveis" ></v-select>
    <v-btn @click="marcarConsulta"> Marcar Consulta </v-btn>
  </div>
</template>

<script>
import consultascalendar from "../components/ConsultasCalendar.vue";
import cache from "../services/cache";
import EventBus from "../services/event-bus"
import apiAgendaClient from "../services/apiAgendaClient"
export default {
  name: "AgendaClient",
  components: {
    consultascalendar,
  },
  data() {
    return {
      title: "Agenda Client",
      diaSelecionado : "",
      horarioSelecionado: "",
      especialidadeSelecionada: "",
      especialidadesDisponiveis : [],
      todosHorarios : [ 
        "08:00", "09:00", "10:00", "11:00", "12:00",
        "13:00", "14:00", "15:00", "16:00", "17:00"
      ]
    };
  },
  mounted(){
    this.registerListeners()
    this.atualizarEspecialidadesDisponiveis()
  },
  destroyed() {
    this.unregisterListeners()
  },
  methods: {
    async marcarConsulta(){
      const res = await apiAgendaClient.marcarConsulta(
        this.diaSelecionado,
        this.horarioSelecionado,
        this.especialidadeSelecionada
      )
      console.log("MARCAR CONSULTA", res)
      EventBus.$emit("marcar-consulta", res)
    },
    async atualizarEspecialidadesDisponiveis(){
      const { data } =  await apiAgendaClient.getSpecs()
      console.log("RESSS", data)
      this.especialidadesDisponiveis = data.especs
        //await apiAgendaClient.getEspecsDisponiveis(this.diaSelecionado)
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
  },
};
</script>
