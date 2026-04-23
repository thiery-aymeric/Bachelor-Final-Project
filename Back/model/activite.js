import Joi  from "joi";
import {Schema, model} from "mongoose";

/* création du shema d'une activite */

const schemaActivite = new Schema({
    nom : {
        type: String,
        required : true,
        minlength : 2 ,
        maxlength : 20
    },
    adress : {
        type : String , 
        required : true ,
        minlength : 2 ,
        maxlength : 10000
    },
    contenu : {
        type : String , 
        required : true ,
        minlength : 2 ,
        maxlength : 10000
    },
    status : {type : String , enum : ['ouvert',"fermer"] , default : "ouvert"},
    
    dt_creation :  {type : Date , default : Date.now}
})


export const Activite = model( "FinalProjectActivite" , schemaActivite);

export const validActivite = Joi.object({
    nom:Joi.string().min(2).max(255).required(),
    adress:Joi.string().min(2).max(10000).required(),
    contenu:Joi.string().min(2).max(10000).required(),
    status: Joi.string().valid("ouvert" ,"fermer").required() 
})