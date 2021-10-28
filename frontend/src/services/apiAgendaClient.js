import axios from "./axios"
class ApiAgendaClient {

    async getSpecs(){
      console.log("getSpecs")
      const res = await axios.get('specs')
        .catch( (error) => {
            console.log(`Catch Error specs raw`, error)
            const { data , status } = error.response
            console.log(`Catch Error specs ${status}`, data)
            return { data , status }
        })
      console.log("Spescs Res", res)
      const { data , status } = res
      return { data ,  status }
    }
  
    async marcarConsulta(
      dia,
      horario,
      especialidade
    ){
      const min = new Date(dia + "T" + horario + ":00")
      const max = new Date(dia + "T" + horario + ":00").addHours(1)
      
      const DTO = { min, max , especialidade }
      console.log( "DTO", DTO )
      const res = await axios.post('marcarConsulta', DTO)
        .catch( (error) => {
            console.log(`Catch Error specs raw`, error)
            const { data , status } = error.response
            console.log(`Catch Error specs ${status}`, data)
            return { data , status }
        })
      console.log("Spescs Res", res)
      const { data , status } = res
      return { data ,  status }
    }
    
}

Date.prototype.addHours= function(h){
  this.setHours(this.getHours()+h);
  return this;
}
var instance = new ApiAgendaClient()
export default  instance