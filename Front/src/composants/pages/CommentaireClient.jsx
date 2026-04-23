import Commentaire from "../commun/Commentaire.jsx";
import { useState , useEffect ,useContext } from "react"
import { UserContext } from "../../context/userContext"
import { useNavigate } from "react-router-dom"
import { getFirstFiveOrderByDate } from "../../services/commentaire.js"
import PaginationCommentaire from "../commun/PaginationCommentaire.jsx";
import { pagination } from "../../utils/functions.js";
import { Link } from "react-router-dom"

function CommentaireClient() {
    const navigate = useNavigate()
    const {isLogged ,} = useContext(UserContext)
    const [commentaires, setCommentaires] = useState([]);
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
            const commentaires = await getFirstFiveOrderByDate()
            setCommentaires(commentaires)
        }
        init();
    } , [])

    const posts = pagination(
        commentaires,
        pageEncours,
        pageSize
      );
    
    return (
    <div className="commentaire">
        <h1>Livre d'or</h1>
        <div  className="lien">
            <Link to="/client/add/commentaire">Ajouter un commentaire</Link>
        </div>
        <hr/>
        <section className="grille">
            { posts.map(function(valeur, index){
                return <Commentaire valeur={valeur} key={index} />
            }) }
        </section>
        
        <PaginationCommentaire
            totalCommentaires={commentaires.length}
            nbCommentaireParPage={pageSize}
            pageEncours={pageEncours}
            onPageChange={changementPage}
        />
    </div>
    ); 
}
export default CommentaireClient;
