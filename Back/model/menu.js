import Joi  from "joi";
import {Schema, model} from "mongoose";

/* création du shema d'un Menu */

const schemaMenu = new Schema({
    nomRepas : {
        type: String,
        required : true,
        minlength : 2 ,
        maxlength : 255
    },
    nomEntree : {
        type: String,
        required : true,
        minlength : 2 ,
        maxlength : 255
    },
    desciptionEntree : {
        type : String , 
        minlength : 0 ,
        maxlength : 1000
    },
    nomPlat : {
        type: String,
        required : true,
        minlength : 2 ,
        maxlength : 255
    },
    desciptionPlat : {
        type : String , 
        minlength : 0 ,
        maxlength : 1000
    },
    nomDessert : {
        type: String,
        required : true,
        minlength : 2 ,
        maxlength : 255
    },
    desciptionDessert : {
        type : String , 
        minlength : 0 ,
        maxlength : 1000
    },
    dt_utilisation:{type : String , 
        required : true ,
        minlength : 7 ,
        maxlength : 11
    },
    dt_creation :  {type : Date , default : Date.now}
})


export const Menu = model( "FinalProjectMenus" , schemaMenu);

// création de la validation
export const validMenu = Joi.object({
    nomRepas:Joi.string().min(2).max(255).required(),
    dt_utilisation:Joi.string().pattern(/^\d{2}-\d{2}-\d{4}$/).required(),
    nomEntree:Joi.string().min(2).max(255).required(),
    desciptionEntree:Joi.string().min(0).max(1000).optional(),
    nomPlat:Joi.string().min(2).max(255).required(),
    desciptionPlat:Joi.string().min(0).max(1000).optional(),
    nomDessert:Joi.string().min(2).max(255).required(),
    desciptionDessert:Joi.string().min(0).max(1000).optional()
})