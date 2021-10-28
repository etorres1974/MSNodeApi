
class Cache {
    constructor(){
        window.cache = this
        this.clearUser()
    }
    getUser() {
        return window.user
    }
    getSpec() {
        return window.spec
    }
    setUser( payload ){
        console.log("payload", payload)
        const { user, spec } = payload
        window.user = user 
        window.spec = spec
    }
    isUserClient(){ 
        return window.user.role == "Client" || false
    }
    isUserDoctor(){ 
        return window.user.role == "Doctor" || false
    }
    clearUser(){
        window.user = null
        window.spec = null
    }
    hasUser(){
        return window.user != null
    }
}
const instance = new Cache()
export default instance