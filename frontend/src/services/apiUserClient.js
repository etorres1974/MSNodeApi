import axios from "./axios"
class ApiUserClient {

  async login(email, pass) {
    const form = {
      email: email,
      password: pass
    }
    console.log("Login", form)
    const res = await axios.post('login', form)
      .catch((error) => {
        const {
          data,
          status
        } = error.response
        console.log(`Catch Error login ${status}`, data)
        return {
          data,
          status
        }
      })
    console.log("Login Response", res)
    const {
      data,
      status
    } = res
    return {
      data,
      status
    }
  }


  async getDoctorsByIds(listaIds) {
    const res = await axios.post('doctorsByIds', listaIds)
      .catch((error) => {
        console.log(`Catch Error specs raw`, error)
        const {
          data,
          status
        } = error.response
        console.log(`Catch Error specs ${status}`, data)
        return {
          data,
          status
        }
      })
    console.log("getDoctorsByIds", res)
    const { data, status } = res
    return { data, status }
  }

  async getAllDoctors() {
    const res = await axios.get('allDoctors')
      .catch((error) => {
        console.log(`Catch Error alldocs raw`, error)
        const {
          data,
          status
        } = error.response
        console.log(`Catch Error alldocs ${status}`, data)
        return {
          data,
          status
        }
      })
    console.log("Get all doctors", res)
    const { data, status } = res
    return { data, status }
  }

  

  async registerClient(role,
    name, email, pass, confirmPass,
    birth, height, weight) {
    const createClientDto = {
      birth,
      height,
      weight
    }
    const form = {
      name: name,
      email: email,
      password: pass,
      passwordConfirmation: confirmPass,
      createClientDto,
      role
    }
    console.log("Register", form)
    var response = await axios.post('signUp', form).catch((error) => {
      const {
        data,
        status
      } = error.response
      console.log(`Catch Error Register Client ${status}`, data)
      return {
        data,
        status
      }
    })
    console.log("Response", response)
    const {
      data,
      status
    } = response
    return {
      data,
      status
    }
  }

  async registerDoctor(role,
    name, email, pass, confirmPass,
    registro, especialidade) {
    const createDoctorDto = {
      registro,
      especialidade
    }
    const form = {
      name: name,
      email: email,
      password: pass,
      passwordConfirmation: confirmPass,
      role,
      createDoctorDto
    }
    console.log("Register", form)
    var response = await axios.post('signUp', form).catch((error) => {
      const {
        data,
        status
      } = error.response
      console.log(`Catch Error Register Doc ${status}`, data)
      return {
        data,
        status
      }
    })
    console.log("Response", response)
    const {
      data,
      status
    } = response
    return {
      data,
      status
    }
  }
}
var instance = new ApiUserClient()
export default instance
