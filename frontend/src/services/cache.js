
class Cache {
    constructor(){
        this.clearUser()
    }
    getUser() {
        return window.user
    }
    setUser( user ){
        window.user = user 
        //TODO - preencher dados do usuário logado
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