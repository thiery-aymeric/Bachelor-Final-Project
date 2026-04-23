import { Link , NavLink, useNavigate } from "react-router-dom"
import { UserContext } from "../../context/userContext"
import { useContext } from "react"

function Header() {
    const navigate = useNavigate();
    const { isLogged , logout ,isAdmin} = useContext(UserContext)

    function deconnexion (){
        logout();
        navigate("/");
    }

    return (
        <header className="header">
            { isLogged() === false && <div className="connection">
                    La Roseliere
                </div>}
        { isLogged() === true && <div>
            <div className="siteName">
                <Link to="/activite">
                    La Roseliere
                </Link>
            </div>
            
            { isLogged() === true && <span onClick={deconnexion}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-door-closed" viewBox="0 0 16 16">
                            <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3zm1 13h8V2H4z"/>
                            <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0"/>
                            </svg>
                            Déconnexion
                        </span>}
            <nav>
            
                {isLogged() === true && isAdmin() === false && <ul>
                
                    <li>
                        <NavLink to='/activite'>
                            Activité
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/menu'>
                            Menu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/commentaire'>
                            Livre d'or
                        </NavLink>
                    </li>
                    
                </ul>}
                {isLogged() === true && isAdmin() === true && <ul>
                    <li>
                        <NavLink to='/admin'>
                            Activité
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/adminMenu'>
                            Menu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/adminCommentaire'>
                            Livre d'or
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/adminUser'>
                            Comptes
                        </NavLink>
                    </li>
                </ul>}

            </nav>
        </div>}
        </header>
    );
}

export default Header;