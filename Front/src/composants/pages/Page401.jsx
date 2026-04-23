import { Link } from "react-router-dom"

function Page401(){
    return (
    <div className="page-erreur">
        <h1>Erreur 401 <small>Vous n'êtes pas autorisé à accéder à cette page sans authentification</small></h1>
        <p>veuillez vous connecter au préalable : 
            <Link to="/">connexion</Link>
        </p>
    </div>
    )
}

export default Page401;