import Menu from "../commun/Menu.jsx";
import { useState , useEffect ,useContext } from "react"
import { UserContext } from "../../context/userContext"
import { useNavigate } from "react-router-dom"
import { getFirstFiveOrderByDate } from "../../services/menu.js"
import PaginationMenu from "../commun/PaginationMenu.jsx";
import { pagination } from "../../utils/functions.js";

function MenuClient() {
    const navigate = useNavigate()
    const {isLogged} = useContext(UserContext)
    const [menus, setMenus] = useState([]);
    const [pageSize] = useState(1);
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
            const menus = await getFirstFiveOrderByDate()
            setMenus(menus)

        }
        init();
    } , [])

    const posts = pagination(
        menus,
        pageEncours,
        pageSize
      );
    
    return (
    <div className="menu">
        <h1>Menu</h1>
        
        <section className="grille">
            { posts.map(function(valeur, index){
                return <Menu valeur={valeur} key={index} />
            }) }
        </section>
        
        <PaginationMenu
            totalMenus={menus.length}
            nbMenuParPage={pageSize}
            pageEncours={pageEncours}
            onPageChange={changementPage}
        />
    </div>
    ); 
}
export default MenuClient;
