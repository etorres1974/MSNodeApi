import axios from "./axios"
class ApiClient {
    async login(email, pass){
      var form = { email :email, password : pass}
      console.log("Login", form)
      var res = await axios.post('login', form)
      console.log("Response", res)
      return res
    }
    async register(name, email, pass, confirmPass){
        var form = { 
            name : name,
            email : email,
            password : pass,
            passwordConfirmation : confirmPass
        }
        console.log("Register", form)
        var response = await axios.post('signUp', form)
        console.log("Response", response)
        return response
    }
}
var instance = new ApiClient()
export default  instance