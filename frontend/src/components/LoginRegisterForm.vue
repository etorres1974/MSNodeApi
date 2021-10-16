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
        <v-text-field v-model="name" placeholder="Name"></v-text-field>
      </v-fade-transition>
      <div>
        <v-text-field v-model="email" placeholder="Email"></v-text-field>
        <v-text-field v-model="pass" placeholder="Password"></v-text-field>
      </div>
      <v-fade-transition v-if="register">
        <v-text-field v-model="confirmPass" placeholder="Confirm Password"></v-text-field>
      </v-fade-transition>
    </div>
    <div id="actions">
      <v-btn @click="submit">Submit</v-btn>
    </div>
  </div>
</template>

<script>
import axios from "../services/axios.js";
import cache from "../services/cache.js"
export default {
  name: "LoginRegisterFormt",
  components: {},
  data() {
    return {
      login: true,
      register: false,
      name : "",
      email: "",
      pass: "",
      confirmPass : ""
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
        var form = { email : this.email, password : this.pass}
        console.log("Login", form)
        await axios.post('login', form)
        //TODO : Salvar usuario logado
        cache.setUser(2)
    },
    async submitRegister(){
        var form = { 
            name : this.name,
            email : this.email,
            pass : this.pass,
            confirmPass : this.confirmPass
        }
        console.log("Register", form)
        await axios.post('register', form)
        //TODO : Salvar usuario logado
        cache.setUser(2)
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

