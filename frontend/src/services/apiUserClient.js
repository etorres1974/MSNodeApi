import axios from "./axios"
class ApiUserClient {

    async login(email, pass){
      const  form = { email :email, password : pass}
      console.log("Login", form)
      const res = await axios.post('login', form)
        .catch( (error) => {
            const { data , status } = error.response
            console.log(`Catch Error login ${status}`, data)
            return { data , status }
        })
      console.log("Login Response", res)
      const { data , status } = res
      return { data ,  status }
    }

    async registerClient(role,
        name, email, pass, confirmPass, 
        birth, height,weight){
        const createClientDto = {
            birth, 
            height,
            weight
        }
        const form = { 
            name : name,
            email : email,
            password : pass,
            passwordConfirmation : confirmPass,
            createClientDto,
            role
        }
        console.log("Register", form)
        var response = await axios.post('signUp', form).catch( (error) => {
            const { data , status } = error.response
            console.log(`Catch Error Register Client ${status}`, data)
            return { data , status }
        })
        console.log("Response", response)
        return response
    }

    async registerDoctor(role,
        name, email, pass, confirmPass, 
        registro, especialidade){
        const createDoctorDto = { registro, especialidade}
        const form = { 
            name : name,
            email : email,
            password : pass,
            passwordConfirmation : confirmPass,
            role,
            createDoctorDto 
        }
        console.log("Register", form)
        var response = await axios.post('signUp', form).catch( (error) => {
            const { data , status } = error.response
            console.log(`Catch Error Register Doc ${status}`, data)
            return { data , status }
        })
        console.log("Response", response)
        return response
    }
}
var instance = new ApiUserClient()
export default  instance