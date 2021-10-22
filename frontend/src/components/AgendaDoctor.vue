<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    <h1>{{ products}}</h1>
  </div>
</template>

<script>
import axios from "../services/axios.js"
export default {
  title: 'Agenda Médico',
  components:{
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
