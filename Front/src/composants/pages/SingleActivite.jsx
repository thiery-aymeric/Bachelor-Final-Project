import { useParams , Link , useNavigate } from "react-router-dom"
import { useState , useEffect } from "react"
import { getOneById } from "../../services/activite.js"

import _ from "lodash"

function SingleActivite(){
    const params = useParams()
    const navigate = useNavigate()
    const [activite, setActivite] = useState({})
    useEffect( function(){

        async function init(){
            const dbActivite = await getOneById(idActivite)
            if(dbActivite.msg ){ 
                navigate("/Page404"); 
                return ;
            }
            setActivite(dbActivite)
        }
        const idActivite = params.id
        if(idActivite){
            init()
        }
    } , [] )

    return (
    <div className="single">
        <Link to="/activite" className="lien">retour</Link>

        <h1>{activite.nom} <p>{activite.status}</p> </h1>
        <div className="grille">
        <p>{activite.adress}</p>
        <p>{activite.contenu}</p>
            
        </div>

    </div>)
}

export default SingleActivite ;