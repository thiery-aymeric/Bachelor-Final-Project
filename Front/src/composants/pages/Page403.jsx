import { Link } from "react-router-dom"

function Page403(){
    return (
    <div className="page-erreur">
        <h1>Erreur 403 <small>Vous n'êtes pas autorisé à accéder à cette page avec votre niveau de droit</small></h1>
        <p>veuillez vous connecter au préalable : 
            <Link to="/">connexion</Link>
        </p>
    </div>
    )
}

export default Page403;