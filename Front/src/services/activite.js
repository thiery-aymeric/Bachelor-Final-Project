const urlServ = import.meta.env.VITE_API_URL;



export async function getAll(){
    const reponse = await fetch(`${urlServ}/activites`);
    const activites = await reponse.json()
    return activites 
}

export async function getFirstFiveOrderByDate(){
    const reponse = await fetch(`${urlServ}/activites`);
    const activites = await reponse.json()
    return activites 
}


export async function getOneById( id ){
    try{
        const reponse = await fetch(`${urlServ}/activites/${id}`); 
        const activite = await reponse.json()
        if(reponse.status !== 200){
            throw new Error(activite)
        }
        return activite ; 
    }catch(err){
        return { msg : "erreur" }
    }
}

export async function newActivite(formulaire){
    
    const options = { 
        method : "POST" , 
        body : JSON.stringify(formulaire) , 
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    }
    console.log(options.body);

    const reponse = await fetch(`${urlServ}/add-activite`, options);
    
    const activite = await reponse.json();
    return activite ; 
}

export async function deleteActivite(id){
    const reponse = await fetch(`${urlServ}/delete-activite/${id}`,
        {
            headers: { 
                'Authorization': localStorage.getItem('token')
            }
        }
    )
    const activites = await reponse.json();
    return activites ; 
}

export async function updateActivite(formulaire , id){
    
    const options = { 
        method : "POST" , 
        body : JSON.stringify(formulaire) , 
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    }

    const reponse = await fetch(`${urlServ}/update-activite/${id}` , options)
    const activites = await reponse.json();
    return activites ; 
}