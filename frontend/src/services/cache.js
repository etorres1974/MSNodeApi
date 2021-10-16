
class Cache {
    constructor(){
        this.clearUser()
    }
    getUser() {
        return window.user
    }
    setUser( id ){
        window.user.id = id 
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