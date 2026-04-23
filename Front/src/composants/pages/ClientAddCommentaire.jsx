import {useState ,  useContext ,useEffect} from "react"

import { newCommentaire } from "../../services/commentaire.js"
import { validMessage } from "../../utils/validation.js"
import { useNavigate } from "react-router-dom"
import {UserContext} from "../../context/userContext"

function AdminAddArticle(){
    const {isLogged , isAdmin} = useContext(UserContext)
    const navigate = useNavigate(); 
    const [nom, setNom] = useState("")
    const [message, setMessage] = useState("")
    const [errors, setErrors] = useState([])
    const [success, setSuccess] = useState("")


    useEffect(function(){
        
        if( isLogged()=== false ){
            navigate("/page401")
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
        const nouveauCommentaire= {nom, message }
        console.log(nouveauCommentaire);
        // ajouter de verification 

        const {error} = validMessage.validate(nouveauCommentaire, {abortEarly : false})

        if(error){
            // afficher des erreurs dans la zone d'erreur sous formulaire 
            const errors = [];
            for (let item of error.details) 
                errors.push(item.message) ;
            setErrors(errors)
            return ; 
        }

        const reponse = await newCommentaire(nouveauCommentaire)
        
        if(reponse._id){
            setNom("");
            setMessage("");
            setSuccess("le est bien enregistré")
            setTimeout( function(){
                setSuccess("")
                navigate("/commentaire")
            },2000)
        }else {
            setErrors([reponse.msg])
        }
    }
   
    return (
        <div className="AddCommentaire">

            <h1>Ajouter un nouveau commentaire</h1>

            <form onSubmit={onSubmit}>

                <input
                    type="text"
                    placeholder="Votre nom"
                    id="nom"
                    label="saisir votre nom"
                    onChange={function(event){
                        setNom(event.target.value)
                        setErrors([])
                    }}
                    value={nom}
                />

            <textarea 
                id="message"
                label="le message de votre commentaire"
                placeholder="le message de votre commentaire"
                onChange={ function(event){
                    setMessage(event.target.value)
                    setErrors([])
                }}
                value={message}
            />
            
            <div>
                <input type="submit" value="ajouter votre commentaire" className="submit"/>
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
export default AdminAddArticle ;