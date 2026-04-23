import { dtFr} from "../../utils/functions"
import { Link } from "react-router-dom"
import _ from "lodash"

function Menu(props) {
    return (
        
        <article className="menu-client"> 
            <section className="TitreMenu">
                <h2>
                    <Link to={`/menu/${props.valeur._id}/${_.kebabCase(props.valeur.nomRepas)}`}>{props.valeur.nomRepas}</Link>
                </h2>

                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-week-fill" viewBox="0 0 16 16">
                        <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M9.5 7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m3 0h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M2 10.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5"/>
                    </svg>&nbsp;
                    {props.valeur.dt_utilisation}
                </div>
            </section>
            <section className="contenuMenu">
                <div>
                    <h3>Entree</h3>
                    <p>{props.valeur.nomEntree}</p>
                </div>
                <div>
                    <h3>Plat</h3>
                    <p>{props.valeur.nomPlat}</p>
                </div>
                <div>
                    <h3>Dessert</h3>
                    <p>{props.valeur.nomDessert}</p>
                </div>
            </section>
            
        </article>
    );
}

export default Menu;
