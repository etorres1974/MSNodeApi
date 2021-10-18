import axios from "./axios"

class ApiClient {
    async login(email, pass){
      var form = { email :email, password : pass}
      console.log("Login", form)
      await axios.post('login', form)
    }
    async register(name, email, pass, confirmPass){
        var form = { 
            name : name,
            email : email,
            pass : pass,
            confirmPass : confirmPass
        }
        console.log("Register", form)
        await axios.post('register', form)
    }
}
var instance = new ApiClient()
export default  instance