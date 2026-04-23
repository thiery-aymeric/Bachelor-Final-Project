import Activite from "../commun/Activite.jsx";
import { useState , useEffect ,useContext } from "react"
import { UserContext } from "../../context/userContext"
import { useNavigate } from "react-router-dom"
import { getFirstFiveOrderByDate } from "../../services/activite.js"
import PaginationActivite from "../commun/PaginationActivite.jsx";
import { pagination } from "../../utils/functions.js";

function ActiviteClient() {
    const navigate = useNavigate()
    const {isLogged} = useContext(UserContext)
    const [activites, setActivites] = useState([]);
    const [pageSize] = useState(4);
    const [pageEncours, setPageEncours] = useState(1);

    const changementPage = (event, pageId) => {
        event.preventDefault();
        setPageEncours(pageId)
    };

    useEffect( function(){

        if( isLogged()=== false ){
            navigate("/page401")
            return ; 
        }
        
        async function init(){
            const activites = await getFirstFiveOrderByDate()
            setActivites(activites)
        }
        init();
    } , [])

    const posts = pagination(
        activites,
        pageEncours,
        pageSize
      );
    
    return (
    <div className="home">
        <p className="accroche" >Voici les activités disponible dans les environs</p>
        <section className="grille">
            { posts.map(function(valeur, index){
                return <Activite valeur={valeur} key={index} />
            }) }
        </section>
        
        <PaginationActivite
            totalActivites={activites.length}
            nbActiviteParPage={pageSize}
            pageEncours={pageEncours}
            onPageChange={changementPage}
        />
    </div>
    ); 
}
export default ActiviteClient;
