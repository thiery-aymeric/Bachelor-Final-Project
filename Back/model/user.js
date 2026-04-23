import Joi  from "joi";
import {Schema, model} from "mongoose";
import sign from "jsonwebtoken/sign.js";
import jwt from 'jsonwebtoken'

/* création du shema d'un utilisateur */

const schemaUser = new Schema({
    name : {
        type: String,
        required : true,
        minlength : 2 ,
        maxlength : 20
    },
    email : {
        type : String , 
        minlength : 0 ,
        maxlength : 255
    },
    password : {
        type : String , 
        required : true ,
        minlength : 2 ,
        maxlength : 255
    },
    dt_creation :  {type : Date , default : Date.now},
    dt_last_connexion : Date , 
    role  : {type : String , enum : ['client', "admin"] , default : "client"}

})

// generation du Json Web Token
schemaUser.methods.generateJwt = function(){

    const paylod = {
        _id : this._id,
        name : this.name,
        role: this.role,
        dt_creation:this.dt_creation
    }

    try{
    
        const jwtoken = sign(paylod, process.env.SECRET_JWT)
        return jwtoken
    
    }catch(err){
        throw new Error(err)
    }

}

export const User = model( "FinalProjectUsers" , schemaUser);

export const validUser = Joi.object({
    name:Joi.string().min(2).max(255).required(),
    email : Joi.string().email({ tlds: { allow: false } }).allow('').optional(),
    password : Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).required(),
    role: Joi.string().valid("client" ,"admin").optional() 
})