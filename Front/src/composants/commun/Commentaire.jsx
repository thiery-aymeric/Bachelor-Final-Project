import _ from "lodash"

function Commentaire(props) {
    return (
        
        <article className="commentaire-client"> 
            <div className="Title">
                <h2>
                    {props.valeur.nom}
                </h2>
                <div>
                    {_.kebabCase(props.valeur.dt_creation.slice(0, 10))}
                </div>
            </div>
            
            <div>
                <p>{props.valeur.message}</p>
            </div>
            <hr/>
        </article>
    );
}

export default Commentaire;
