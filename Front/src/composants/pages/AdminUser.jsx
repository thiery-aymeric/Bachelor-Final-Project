import { getAll , deleteUser } from "../../services/users.js"
import { Link } from "react-router-dom"
import {useState , useEffect , useContext } from "react"
import { UserContext } from "../../context/userContext"
import { useNavigate } from "react-router-dom"
import { pagination , dtFrMin } from "../../utils/functions.js";
import PaginationActivite from "../commun/PaginationActivite.jsx"


function AdminUser(){
    const navigate = useNavigate()
    const {isLogged , isAdmin} = useContext(UserContext)
    const [users , setUsers] = useState([]);
    const [pageSize] = useState(10);
    const [pageEncours, setPageEncours] = useState(1);


    const changementPage = (event, pageId) => {
        event.preventDefault();
        setPageEncours(pageId)
    };

    useEffect(function(){
        
        if( isLogged()=== false ){
            navigate("/page401")
            return ; 
        }
        if( isAdmin()=== false ){
            navigate("/activite")
            return ; 
        }
        async function init(){
            const users = await getAll()
            setUsers(users)
        }
        init(); 
    } , [])

    async function supprimer(id){
        const verif = confirm("êtes vous sûr de vouloir supprimer cet activite")
        if(verif){
            const reponse = await deleteUser(id)
            console.log(reponse)
            if(reponse.msg){
                alert(reponse.msg)
                return ;
            }
            setUsers(reponse);
        }
    }

    const posts = pagination(
        users,
        pageEncours,
        pageSize
      );


    return (<div className="admin">
        <h1>Admin</h1>
        <Link to="/admin/add/user" className="lien">Ajouter un compte</Link>
        <table>
            <thead>
                <tr>
                    <th className="nom">Nom</th>
                    <th className="roleth">role</th>
                    <th className="action">Action</th>
                </tr>
            </thead>
            <tbody>
                {posts.map(function(user, index){
                    return <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.role}</td>
                       
                        <td>
                            <Link to={`/admin/update/user/${user._id}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                            </svg>
                            </Link>
                            <span className="btn-delete" onClick={ function(){
                               supprimer(user._id)
                            }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                            </span>
                        </td>
                    </tr>   
                })}
            </tbody>

        </table>
        <PaginationActivite
            totalUsers={users.length}
            nbUserParPage={pageSize}
            pageEncours={pageEncours}
            onPageChange={changementPage}
        />
        
        
        

    </div>)

}
export default AdminUser;
/** {isAdmin() && <h2>Gestion des Gestionnaires</h2>} */