
const urlServ = import.meta.env.VITE_API_URL;


export async function getAll(){
    const reponse = await fetch(`${urlServ}/messages`);
    const commentaires = await reponse.json()
    return commentaires 
}


export async function getFirstFiveOrderByDate(){
    const reponse = await fetch(`${urlServ}/messages`);
    const commentaires = await reponse.json()
    return commentaires 
}


export async function getOneById( id ){
    try{
        const reponse = await fetch(`${urlServ}/message/${id}`); 
        const commentaire = await reponse.json()
        if(reponse.status !== 200){
            throw new Error(commentaire)
        }
        return commentaire ; 
    }catch(err){
        return { msg : "erreur" }
    }
}

export async function newCommentaire(formulaire){
    
    const options = { 
        method : "POST" , 
        body : JSON.stringify(formulaire) , 
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    }
    console.log(options.body);

    const reponse = await fetch(`${urlServ}/add-message`, options);
    
    const commentaire = await reponse.json();
    return commentaire ; 
}

export async function deleteCommentaire(id){
    const reponse = await fetch(`${urlServ}/delete-message/${id}`,
        {
            headers: { 
                'Authorization': localStorage.getItem('token')
            }
        }
    )
    const commentaires = await reponse.json();
    return commentaires ; 
}

