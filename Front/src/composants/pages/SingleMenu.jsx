import { useParams , Link , useNavigate } from "react-router-dom"
import { useState , useEffect } from "react"
import { getOneById } from "../../services/menu.js"

import _ from "lodash"

function SingleMenu(){
    const params = useParams()
    const navigate = useNavigate()
    const [menu, setMenu] = useState({})
    useEffect( function(){

        async function init(){
            const dbMenu = await getOneById(idMenu)
            if(dbMenu.msg ){ 
                navigate("/Page404"); 
                return ;
            }
            setMenu(dbMenu)
        }
        const idMenu = params.id
        if(idMenu){
            init()
        }
    } , [] )

    return (
    <div className="single">
        <Link to="/menu" className="lien">retour</Link>

        <h1>{menu.nomRepas} <p>{menu.dt_utilisation}</p> </h1>
        <section className="grille">
            <div>
                <h2>Entrée</h2>
                <p>{menu.nomEntree}</p>
                <p>{menu.desciptionEntree}</p>
            </div>
            <div>
                <h2>Plat</h2>
                <p>{menu.nomPlat}</p>
                <p>{menu.desciptionPlat}</p>
            </div>
            <div>
                <h2>Désert</h2>
                <p>{menu.nomDessert}</p>
                <p>{menu.desciptionDessert}</p>
            </div>
            
            
        </section>

    </div>)
}

export default SingleMenu ;