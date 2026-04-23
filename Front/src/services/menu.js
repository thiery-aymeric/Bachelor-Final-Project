const urlServeur = import.meta.env.VITE_API; 


export async function getAll(){
    const reponse = await fetch(`http://localhost:1237/Menus`);
    const menus = await reponse.json()
    return menus 
}


export async function getFirstFiveOrderByDate(){
    const reponse = await fetch(`http://localhost:1237/Menus`);
    const menus = await reponse.json()
    return menus 
}


export async function getOneById( id ){
    try{
        const reponse = await fetch(`http://localhost:1237/Menus/${id}`); 
        const menu = await reponse.json()
        if(reponse.status !== 200){
            throw new Error(menu)
        }
        return menu ; 
    }catch(err){
        return { msg : "erreur" }
    }
}

export async function newMenu(formulaire){
    
    const options = { 
        method : "POST" , 
        body : JSON.stringify(formulaire) , 
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    }
    console.log(options.body);

    const reponse = await fetch(`http://localhost:1237/addMenu`, options);
    
    const menu = await reponse.json();
    return menu ; 
}


export async function deleteMenu(id){
    const reponse = await fetch(`http://localhost:1237/delete-menu/${id}`,
        {
            headers: { 
                'Authorization': localStorage.getItem('token')
            }
        }
    )
    const menus = await reponse.json();
    return menus ; 
}

export async function updateMenu(formulaire , id){
    
    const options = { 
        method : "POST" , 
        body : JSON.stringify(formulaire) , 
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    }

    const reponse = await fetch(`http://localhost:1237/update-menu/${id}` , options)
    const menus = await reponse.json();
    return menus ; 
}