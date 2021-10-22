
class Cache {
    constructor(){
        window.cache = this
        this.clearUser()
    }
    getUser() {
        return window.user
    }
    setUser( payload ){
        console.log("payload", payload)
        const { user, spec } = payload
        window.user = user 
        window.spec = spec
    }
    isUserClient(){ 
        return window.user.role == "Client"
    }
    isUserDoctor(){ 
        return window.user.role == "Doctor"
    }
    clearUser(){
        window.user = {}
    }
    hasUser(){
        return window.user != {}
    }
}
const instance = new Cache()
export default instance