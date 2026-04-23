import { useState , createContext } from "react"
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

export function UserContextProvider({children}){

    let  defaultProfil = {}
    if(localStorage.getItem("token")){
        defaultProfil = jwtDecode(localStorage.getItem("token"))
        
    }
    
    const [profil, setProfil] = useState({defaultProfil})

    function login(token){
        const user = jwtDecode(token)

        //ajout du token dans le local storage
        localStorage.setItem("token",token)
        // set du token dans le state du Profil
        setProfil(user)
    }
    function logout(){
        //reset le state du Profil (enleve le token du profil)
        setProfil({});
        // enleve le token du local storage 
        localStorage.removeItem("token")
    }
    
    function isLogged(){
        if(profil._id){
            return true;
        }
        return false
    }
    function isAdmin(){
        return profil.role === "admin"; 
    }
    function isGestionnaire(){
        return profil.role === "gestionnaire" ; 
    }
    return <UserContext.Provider value={{ profil , login,logout,isLogged,isAdmin,isGestionnaire}}>
        { children }
    </UserContext.Provider>
}
