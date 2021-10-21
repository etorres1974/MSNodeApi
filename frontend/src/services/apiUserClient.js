import axios from "./axios"
class ApiUserClient {

    async login(email, pass){
      const  form = { email :email, password : pass}
      console.log("Login", form)
      const  res = await axios.post('login', form)
      console.log("Response", res)
      return res
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
        var response = await axios.post('signUp', form)
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
        var response = await axios.post('signUp', form)
        console.log("Response", response)
        return response
    }
}
var instance = new ApiUserClient()
export default  instance