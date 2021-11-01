<template>
  <v-snackbar
      :color="color"
      :timeout="timer"
      v-model="showSnackbar"
      bottom

  >
    <v-icon left>{{icon}}</v-icon>{{message}}
  </v-snackbar>
</template>

<script>
export default {
  name: "vtoast",
  data() {
    return{
      showSnackbar: false,
      message: '',
      color: 'success',
      icon: 'mdi-check',
      timer: 2000
    }
  },
  methods:{
    success(data) {
      console.log("TOAST", data)
      this.message = data.message || 'Success'
      this.color = data.color || 'success'
      this.timer = data.timer || 2000
      this.icon = data.icon || 'mdi-check'
      this.showSnackbar = true 
    },
    error(data) {
      this.message = data.message || 'Error'
      this.color = data.color || 'error'
      this.timer = data.timer || 2000
      this.icon = data.icon || 'mdi-error'
      this.showSnackbar = true 
    }
  }
}
</script>