<template>
  <div class="ma-6 pa-6 LoginRegisterForm">
    <v-row>
      <h2 class="ma-2">{{ title }}</h2>
      <v-fade-transition>
        <v-btn text v-if="login" class="ma-2" @click="toggleForm">
          <v-icon>mdi-arrow-right</v-icon> Register
        </v-btn>

        <v-btn text v-else class="ma-2" @click="toggleForm">
          <v-icon>mdi-arrow-left</v-icon> Login
        </v-btn>
      </v-fade-transition>
    </v-row>
    
    <div id="form">
      <v-fade-transition v-if="register">
        <div>
           <v-radio-group v-model="radioRole">
              <v-radio
                v-for="r in roles"
                :key="r"
                :label="`${r.placeholder}`"
                :value="r.enum"
              ></v-radio>
           </v-radio-group>
           <v-text-field v-model="name" placeholder="Name"></v-text-field>
        </div>
      </v-fade-transition>

      
      <div v-if="radioRole == 'Doctor' "> 
        <v-text-field v-model="registro" placeholder="Registro Profissional"></v-text-field> 
        <v-text-field v-model="especialidade" placeholder="Especialidade Médica"></v-text-field> 
      </div>
      <div v-if="radioRole == 'Paciente' ">
        <v-text-field v-model="birth" placeholder="Data Nascimento"></v-text-field>
        <v-text-field v-model="height" placeholder="Altura"></v-text-field>
        <v-text-field v-model="weight" placeholder="Peso"></v-text-field>
      </div>

      <div>
        <v-text-field v-model="email" placeholder="Email"></v-text-field>
        <v-text-field v-model="pass" placeholder="Password"></v-text-field>
      </div>
      <v-fade-transition v-if="register">
        <v-text-field v-model="confirmPass" placeholder="Confirm Password"></v-text-field>
      </v-fade-transition>
    </div>
    <div id="actions">
      <v-btn @click="submitRegister">Submit</v-btn>
    </div>
  </div>
</template>

<script>
import apiUserClient from "../services/apiUserClient";
import cache from "../services/cache.js"
export default {
  name: "LoginRegisterFormt",
  components: {},
  data() {
    return {
      login: true,
      register: false,
      radioRole: "",
      roles: [ { enum : "Doctor" , placeholder : "Médico" }
              , { enum : "Client", placeholder : "Paciente" }],
      name : "",
      email: "",
      pass: "",
      confirmPass : "",
      //Client
      weight : "",
      height : "",
      birth : "",

      //Doctor
      registro : "",
      especialidade : ""

    };
  },
  methods: {
    toggleForm() {
      this.login = !this.login;
      this.register = !this.register;
    },
    submit(){
        if(this.login)
            this.submitLogin()
        else if (this.register)
            this.submitRegister()
    },
    async submitLogin(){
        await apiUserClient.login(this.email, this.pass)
        //TODO : Salvar usuario logado
        cache.setUser(2)
    },
    async registerClient(){
        const user = await apiUserClient.registerClient(
            this.radioRole,
            this.name,
            this.email,
            this.pass,
            this.confirmPass,
            this.birth,
            this.height,
            this.weight)
        //TODO : Salvar usuario logado
        cache.setUser(2)
    },
    async registerDoctor(){
      const user = await apiUserClient.registerDoctor(
            this.radioRole,
            this.name,
            this.email,
            this.pass,
            this.confirmPass,
            this.registro,
            this.especialidade)
        //TODO : Salvar usuario logado
        cache.setUser(2)
    },
    async submitRegister(){
      console.log("SubmitRegister", this.radioRole)
      if(this.radioRole == "Client")
        this.registerClient()
      else if (this.radioRole == "Doctor")
        this.registerDoctor()
    }
  },
  computed: {
    title() {
      if (this.login) return "Login";
      else return "Register";
    },
  },
};
</script>

