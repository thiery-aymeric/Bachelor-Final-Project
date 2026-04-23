// import data from "../assets/data.json";

const urlServeur = import.meta.env.VITE_API; 



export async function getAll(){
    const reponse = await fetch(`http://localhost:1237/activites`);
    const activites = await reponse.json()
    return activites 
}

export async function getFirstFiveOrderByDate(){
    const reponse = await fetch(`http://localhost:1237/activites`);
    const activites = await reponse.json()
    return activites 
}


export async function getOneById( id ){
    try{
        const reponse = await fetch(`http://localhost:1237/activites/${id}`); 
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

    const reponse = await fetch(`http://localhost:1237/add-activite`, options);
    
    const activite = await reponse.json();
    return activite ; 
}

export async function deleteActivite(id){
    const reponse = await fetch(`http://localhost:1237/delete-activite/${id}`,
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

    const reponse = await fetch(`http://localhost:1237/update-activite/${id}` , options)
    const activites = await reponse.json();
    return activites ; 
}