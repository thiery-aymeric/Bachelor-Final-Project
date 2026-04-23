import Connexion from "./composants/pages/Connexion";

import ActiviteClient from "./composants/pages/ActiviteClient";
import SingleActivite from "./composants/pages/SingleActivite";
import AdminActivite from "./composants/pages/AdminActivite";
import AdminAddActivite from "./composants/pages/AdminAddActivite";
import AdminUpdateActivite from "./composants/pages/AdminUpdateActivite";

import MenuClient from "./composants/pages/MenuClient";
import SingleMenu from "./composants/pages/SingleMenu";
import AdminMenu from "./composants/pages/AdminMenu";
import AdminAddMenu from "./composants/pages/AdminAddMenu";
import AdminUpdateMenu from "./composants/pages/AdminUpdateMenu";

import CommentaireClient from "./composants/pages/CommentaireClient";
import AdminCommentaire from "./composants/pages/AdminCommentaire";
import ClientAddCommentaire from "./composants/pages/ClientAddCommentaire"

import AdminUser from "./composants/pages/AdminUser";
import AdminAddUser from "./composants/pages/AdminAddUser";
import AdminUpdateUser from  "./composants/pages/AdminUpdateUser";

import {Routes,Route} from "react-router-dom";
import { UserContextProvider } from "./context/userContext";

import Page401 from "./composants/pages/Page401";
import Page403 from "./composants/pages/Page403";
import Page404 from "./composants/pages/Page404";

import Header from "./composants/commun/header";







function App() {
  return ( 
    <div>
      
      <UserContextProvider>
        <Header/>
        <main className="mainContainer">
            <Routes>
              <Route path="/" element={< Connexion />} />
              <Route path="/admin" element={< AdminActivite />} />
              <Route path="/activite" element={< ActiviteClient />} />
              <Route path="/admin/add/activite" element={< AdminAddActivite />} />
              <Route path="/admin/update/activite/:id" element={< AdminUpdateActivite />} />
              <Route path="/activite/:id/:slug" element={ <SingleActivite /> } />

              <Route path="/adminMenu" element={< AdminMenu />} />
              <Route path="/menu" element={< MenuClient />} />
              <Route path="/admin/add/menu" element={< AdminAddMenu />} />
              <Route path="/admin/update/menu/:id" element={< AdminUpdateMenu />} />
              <Route path="/menu/:id/:slug" element={ <SingleMenu /> } />

              <Route path="/adminCommentaire" element={< AdminCommentaire />} />
              <Route path="/commentaire" element={< CommentaireClient />} />
              <Route path="/client/add/commentaire" element={< ClientAddCommentaire />} />

              <Route path="/adminUser" element={< AdminUser />} />
              <Route path="/admin/add/user" element={< AdminAddUser />} />
              <Route path="/admin/update/user/:id" element={< AdminUpdateUser />} />

              <Route path="/page401" element={<Page401/>}/>
              <Route path="/page403" element={<Page403/>}/>
              <Route path="*" element={<Page404/>}/>
            </Routes>
        </main>
      </UserContextProvider>

    </div>
  );
}

export default App;