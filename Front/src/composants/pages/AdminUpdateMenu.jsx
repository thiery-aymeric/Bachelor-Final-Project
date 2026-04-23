import {useState ,  useContext ,useEffect} from "react"
import {getOneById , updateMenu} from "../../services/menu.js"
import { validMenu} from "../../utils/validation.js"
import {useParams, useNavigate } from "react-router-dom"
import {UserContext} from "../../context/userContext"

function AdminUpdateMenu(){
    const {isLogged , isAdmin} = useContext(UserContext)
    const params = useParams();
    const navigate = useNavigate(); 
    const [nomRepas, setNomRepas] = useState("")
    const [dt_utilisation, setDtUtilisation] = useState("")
    const [nomEntree, setNomEntree] = useState("")
    const [desciptionEntree, setDesciptionEntree] = useState("")
    const [nomPlat, setNomPlat] = useState("")
    const [desciptionPlat, setDesciptionPlat] = useState("")
    const [nomDessert, setNomDessert] = useState("")
    const [desciptionDessert, setDesciptionDessert] = useState("")
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
            
            const menu = await getOneById(id);
            if(!menu){
                navigate("/404");
                return ;
            }
            setNomRepas(menu.nomRepas)
            setDtUtilisation(menu.dt_utilisation)
            setNomEntree(menu.nomEntree)
            setDesciptionEntree(menu.desciptionEntree)
            setNomPlat(menu.nomPlat)
            setDesciptionPlat(menu.desciptionPlat)
            setNomDessert(menu.nomDessert)
            setDesciptionDessert(menu.desciptionDessert)
        }
        init(); 
    }, [])

    async function onSubmit(event){
        event.preventDefault();
        const MenuModifier = {nomRepas, dt_utilisation ,nomEntree , desciptionEntree,nomPlat, desciptionPlat,nomDessert,desciptionDessert}
        // ajouter de verification 

        const {error} = validMenu.validate(MenuModifier, {abortEarly : false})

        if(error){
            // afficher des erreurs dans la zone d'erreur sous formulaire 
            const errors = [];
            for (let item of error.details) 
                errors.push(item.message) ;
            setErrors(errors)
            return ; 
        }

        const reponse = await updateMenu(MenuModifier, id)
        
        if(reponse.acknowledged === true){
            setNomRepas("")
            setDtUtilisation("");
            setNomEntree(""); 
            setDesciptionEntree("");
            setNomPlat("")
            setDesciptionPlat("")
            setNomDessert("")
            setDesciptionDessert("")
            setSuccess("le menu est bien enregistré en base de données !!!")
            setTimeout( function(){
                setSuccess("")
                navigate("/adminMenu")
            },2000)
        }else {
            setErrors([reponse.msg])
        }
    }
   
    return (
        <div className="admin">

            <h1>modifier un menu</h1>

            <form onSubmit={onSubmit}>

            <input
                    type="text"
                    placeholder="le nom du repas"
                    id="nomRepas"
                    label="saisir le nom du repas"
                    onChange={function(event){
                        setNomRepas(event.target.value)
                        setErrors([])
                    }}
                    value={nomRepas}
                />
                <input
                    type="text"
                    placeholder="date format jj-mm-aaaa"
                    id="dt_utilisation"
                    label="date au format jj-mm-aaaa"
                    onChange={function(event){
                        setDtUtilisation(event.target.value)
                        setErrors([])
                    }}
                    value={dt_utilisation}
                />

                <input
                    type="text"
                    placeholder="le nom de l'entre"
                    id="nomEntree"
                    label="saisir le nom de l'entre"
                    onChange={function(event){
                        setNomEntree(event.target.value)
                        setErrors([])
                    }}
                    value={nomEntree}
                />
        
                <textarea 
                    id="desciptionEntree"
                    label="la descritpion de l'entre"
                    placeholder="la descritpion de l'entre"
                    onChange={ function(event){
                        setDesciptionEntree(event.target.value)
                        setErrors([])
                    }}
                    value={desciptionEntree}
                />
            
                <input
                    type="text"
                    placeholder="le nom du plat"
                    id="nomPlat"
                    label="saisir le nom du plat"
                    onChange={function(event){
                        setNomPlat(event.target.value)
                        setErrors([])
                    }}
                    value={nomPlat}
                />
        
                <textarea 
                    id="desciptionPlat"
                    label="la descritpion du plat"
                    placeholder="la descritpion du plat"
                    onChange={ function(event){
                        setDesciptionPlat(event.target.value)
                        setErrors([])
                    }}
                    value={desciptionPlat}
                />

                <input
                    type="text"
                    placeholder="le nom du dessert"
                    id="nomDessert"
                    label="saisir le nom du dessert"
                    onChange={function(event){
                        setNomDessert(event.target.value)
                        setErrors([])
                    }}
                    value={nomDessert}
                />
        
                <textarea 
                    id="desciptionDessert"
                    label="la descritpion du dessert"
                    placeholder="la descritpion du dessert"
                    onChange={ function(event){
                        setDesciptionDessert(event.target.value)
                        setErrors([])
                    }}
                    value={desciptionDessert}
                />
            
            <div>
                <input type="submit" value="modifier le menu"/>
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
export default AdminUpdateMenu ;