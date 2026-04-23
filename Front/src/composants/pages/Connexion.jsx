import { useState,useContext } from "react";
import { UserContext } from "../../context/userContext";
import { validUser } from "../../utils/validation";
import { login as loginRequest } from "../../services/users";
import { useNavigate } from "react-router-dom"

function Connexion(){
    const { login  } = useContext(UserContext); 
    const navigate = useNavigate();
    const [name, setName]= useState("")
    const [password, setPassword]= useState("")
    const [success, setSuccess] = useState("")
    const [errors, setErrors] = useState([])

    async function onSubmit(event){
        event.preventDefault();
        const nouveauProfil = {name , password};
        // vérification avant de faire la requête ajax
        const {error} = validUser.validate(nouveauProfil , {abortEarly : false})
        if(error){
            // afficher des erreurs sous formulaire 
            const errors = [];
            for (let item of error.details) 
                errors.push(item.message) ;
            setErrors(errors)
            return ; 
        }
        const reponse = await loginRequest(nouveauProfil);

        if(reponse.token){
            login(reponse.token); // on passe le token dans le state 
            setName("")
            setPassword("");
            navigate("/admin"); 
        }else {
            setErrors([reponse.msg])
        }
    }

    return <div className="login">
        <form onSubmit={onSubmit}>
                <input type="text" value={name} placeholder="Votre nom" label="saisir le nom" onChange={function(event){
                        setName(event.target.value)
                        setErrors([])
                    }}
                />
                <input type="password" value={password} placeholder="votre mot de passe" label="saisir votre mot de passe" onChange={function(event){
                        setPassword(event.target.value)
                        setErrors([])
                    }}
                />
                <div>
                    <input type="submit"  value="connexion" className="submit"/>
                </div>
            </form>
            <div>
                { success.length > 0 && <p className="msg-success">{ success }</p> }
            </div>
            <div>
                {errors.map(function(erreur,index){
                    return (<div key={index} className="msg-erreur">{erreur}</div>)
                })}
            </div>

    </div>
}
export default Connexion