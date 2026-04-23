import {Router} from "express"
import { Activite , validActivite } from "../model/activite.js"
import {verifyToken} from "../middelWare/verification.js"
import { isValidObjectId } from "mongoose"
const router = Router();


//ajout d'un nouveau profil
router.post("/add-activite",verifyToken  ,async function(req, rep){
    const body = req.body ;
    const {error} = validActivite.validate(body, {abortEarly : false})
    
    if(error){
        rep.status(400).json({msg : "activite invalid"});
        return ; 
    }

    const activite = new Activite(body)
    const reponse = await activite.save();
    rep.json(reponse)
})

// récupérer l'ensemble des activites stockés 
router.get("/activites" , async function(req, rep){
    const activite = await Activite.find().sort({ dt_publication: -1 });
    rep.json(activite); 
})

router.get("/activites/:id", async function(req, rep){
    const id = req.params.id
    const verif = isValidObjectId(id)
    if(!verif){
        rep.status(400).json({msg : "id invalid"});
        return ; 
    }
    const activite = await Activite.findOne({_id : id})
    if(!activite){
        rep.status(404).json({msg : "activite introuvable"})
        return ; 
    }
    rep.json(activite); 
})

router.get("/delete-activite/:id", verifyToken ,  async function(req, rep){
    const id = req.params.id ; 
    const verification = isValidObjectId(id)
    if(!verification){
        rep.status(400).json({msg : "id invalid"});
        return ; 
    }
    const activite = await Activite.findOne({_id : id})
    if(!activite){ 
        rep.status(404).json({msg : "article introuvable"})
        return ; 
    }
    await Activite.deleteOne({_id : id})
    const allActivites = await Activite.find().sort({ dt_publication: -1 });
    rep.json(allActivites) ;  //une fois que j'ai réussi à supprimer mon activite 
    // node me retourne l'ensemble des activites présents en base de données
})

router.post("/update-activite/:id", verifyToken ,async function(req, rep){
    const id = req.params.id ;
    const body = req.body ;
    const reponse = await Activite.updateOne({_id : id},{$set : body}, {$new : true });
    rep.json(reponse);
})

export default router ; 