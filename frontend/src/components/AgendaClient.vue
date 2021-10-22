<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    <h1>{{products}}</h1>
  </div>
</template>

<script>
import axios from "../services/axios.js"
export default {
  name: 'Agenda Cliente',
  components:{
  },
  data () {
    return {
      title: 'Agenda Client',
      users : {
        id : 1 //TODO FETCH FROM CURRENT USER
      },
      products : []
    }
  },
  methods: {
    async getMyProducts(){
      //this.products = await axios.get(`myProducts/${this.id}`)
    }
  },
  created() {
    this.getMyProducts()
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
