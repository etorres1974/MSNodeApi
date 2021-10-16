<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    <h1>{{users}}</h1>
  </div>
</template>

<script>
import axios from "../services/axios.js"
export default {
  name: 'Account',
  components:{
  },
  data () {
    return {
      title: 'Account',
      users : []
    }
  },
  methods: {
    async getAllUsers(){
      this.users = await axios.get('allUsers')
    }
  },
  created() {
    this.getAllUsers()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
