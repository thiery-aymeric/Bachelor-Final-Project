import {useState ,  useContext ,useEffect} from "react"
import {getOneById , updateActivite} from "../../services/activite.js"
import { validUser } from "../../utils/validation.js"
import {useParams, useNavigate } from "react-router-dom"
import {UserContext} from "../../context/userContext"

function AdminAddActivite(){
    const {isLogged , isAdmin} = useContext(UserContext)
    const params = useParams();
    const navigate = useNavigate(); 
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    const [errors, setErrors] = useState([])
    const [success, setSuccess] = useState("")

    const id = params.id ;

    useEffect(function(){
        
        if( isLogged()=== false ){
            navigate("/page401")
            return ; 
        }
        if( isAdmin()=== false ){
            navigate("/page403")
            return ; 
        }
     async function init(){
            
            const activite = await getOneById(id);
            if(!activite){
                navigate("/404");
                return ;
            }
            setName(activite.nom)
            setEmail(activite.adress)
            setPassword(activite.contenu)
            setRole(activite.status)
        }
        init(); 
    }, [])

    async function onSubmit(event){
        event.preventDefault();
        const UserModifier = {nom, adress ,contenu , status }
        // ajouter de verification 

        const {error} = validActivite.validate(UserModifier, {abortEarly : false})

        if(error){
            // afficher des erreurs dans la zone d'erreur sous formulaire 
            const errors = [];
            for (let item of error.details) 
                errors.push(item.message) ;
            setErrors(errors)
            return ; 
        }

        const reponse = await updateUser(UserModifier, id)
        
        if(reponse.acknowledged === true){
            setContenu("")
            setNom("");
            setAdress(""); 
            setStatus("");
            setSuccess("l'activite est bien enregistré en base de données !!!")
            setTimeout( function(){
                setSuccess("")
                navigate("/admin")
            },2000)
        }else {
            setErrors([reponse.msg])
        }
    }
   
    return (
        <div className="admin">

            <h1>modifier un utilisateur</h1>

            <form onSubmit={onSubmit}>

                <input
                    type="text"
                    placeholder="le nom du compte"
                    id="name"
                    label="le nom du compte"
                    onChange={function(event){
                        setName(event.target.value)
                        setErrors([])
                    }}
                    value={name}
                />

                <input
                    type="email"
                    placeholder="l'adresse email"
                    id="adress"
                    label="saisir l'adresse de l'activite"
                    onChange={function(event){
                        setEmail(event.target.value)
                        setErrors([])
                    }}
                    value={email}
                />
                <input
                    type="text"
                    placeholder="le mot de passe"
                    id="password"
                    label="le mot de passe"
                    onChange={function(event){
                        setPassword(event.target.value)
                        setErrors([])
                    }}
                    value={password}
                />
            <div className="role">
                <label htmlFor="role">role</label>
                <select name="role" id="role" onChange={function(event){
                    setRole(event.target.value)
                }}
                required value={role}>
                    <option value="">sélectionner un status</option>
                    <option value={"client"}>client</option>
                    <option value={"admin"}>admin</option>
                </select>
            </div>
    
            <div className="Divsubmit">
                <input type="submit" value="Modifier le compte" className="submit"/>
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

    )
}
export default AdminAddActivite ;