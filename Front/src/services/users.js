const urlServ = import.meta.env.VITE_API_URL;
/** ${urlServ} */
export async function login(profil){
    const options = { 
        method : "POST" , 
        body : JSON.stringify(profil) , 
        headers: { 'Content-Type': 'application/json' }
    }
    const reponse = await fetch(`${urlServ}/login`, options);
    const user = await reponse.json()
    return user
}

export async function register(profil){
    const options = { 
        method : "POST" , 
        body : JSON.stringify(profil) , 
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    }
    const reponse = await fetch(`${urlServ}/addProfil`, options);
    const user = await reponse.json()
    return user
}

export async function getAll(){
    const reponse = await fetch(`${urlServ}/users`);
    const users = await reponse.json()
    return users 
}

export async function deleteUser(id){
    const reponse = await fetch(`${urlServ}/delete-user/${id}`,
        {
            headers: { 
                'Authorization': localStorage.getItem('token')
            }
        }
    )
    const users = await reponse.json();
    return users ; 
}
