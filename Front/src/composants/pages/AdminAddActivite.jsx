import {useState ,  useContext ,useEffect} from "react"

import { newActivite } from "../../services/activite.js"
import { validActivite } from "../../utils/validation.js"
import { useNavigate } from "react-router-dom"
import {UserContext} from "../../context/userContext"

function AdminAddActivite(){
    const {isLogged , isAdmin} = useContext(UserContext)
    const navigate = useNavigate(); 
    const [nom, setNom] = useState("")
    const [adress, setAdress] = useState("")
    const [contenu, setContenu] = useState("")
    const [status, setStatus] = useState("")
    const [errors, setErrors] = useState([])
    const [success, setSuccess] = useState("")


    useEffect(function(){
        
        if( isLogged()=== false ){
            navigate("/page401")
            return ; 
        }
        if( isAdmin()=== false ){
            navigate("/page403")
            return ; 
        }
     
    } , [])
/** 
    const handleFileChange = (e) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
      };
*/
    async function onSubmit(event){
        event.preventDefault();
        const nouvelActivite = {nom, adress ,contenu , status }
        console.log(nouvelActivite);
        // ajouter de verification 

        const {error} = validActivite.validate(nouvelActivite, {abortEarly : false})

        if(error){
            // afficher des erreurs dans la zone d'erreur sous formulaire 
            const errors = [];
            for (let item of error.details) 
                errors.push(item.message) ;
            setErrors(errors)
            return ; 
        }

        const reponse = await newActivite(nouvelActivite)
        
        if(reponse._id){
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

            <h1>Ajouter un nouvel activite</h1>

            <form onSubmit={onSubmit}>

                <input
                    type="text"
                    placeholder="le nom de l'activite"
                    id="nom"
                    label="saisir le nom de l'activite"
                    onChange={function(event){
                        setNom(event.target.value)
                        setErrors([])
                    }}
                    value={nom}
                />

                <input
                    type="text"
                    placeholder="l'adresse de l'activite"
                    id="adress"
                    label="saisir l'adresse de l'activite"
                    onChange={function(event){
                        setAdress(event.target.value)
                        setErrors([])
                    }}
                    value={adress}
                />
            
            <div>
                <label htmlFor="status">status</label>
                <select name="status" id="status" onChange={function(event){
                    setStatus(event.target.value)
                }}
                required value={status}>
                    <option value="">sélectionner un status</option>
                    <option value={"ouvert"}>ouvert</option>
                    <option value={"fermer"}>fermer</option>
                </select>
            </div>
            
            <textarea 
                id="contenu"
                label="le contenu de l'activite"
                placeholder="le contenu de l'activite"
                onChange={ function(event){
                    setContenu(event.target.value)
                    setErrors([])
                }}
                value={contenu}
            />
            
            <div>
                <input type="submit" value="ajouter une nouvelle activite"/>
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