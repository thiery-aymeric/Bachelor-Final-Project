import Joi from 'joi'

export const validActivite = Joi.object({
    nom:Joi.string().min(2).max(255).required(),
    adress:Joi.string().min(2).max(10000).required(),
    contenu:Joi.string().min(2).max(10000).required(),
    status: Joi.string().valid("ouvert" ,"fermer").required() 
})

export const validUser = Joi.object({
    name : Joi.string().min(2).max(255).required(),
    password : Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).required()
})

export const validAddUser = Joi.object({
    name:Joi.string().min(2).max(255).required(),
    email : Joi.string().email({ tlds: { allow: false } }).allow('').optional(),
    password : Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).required(),
    role: Joi.string().valid("client" ,"gestionnaire","admin").optional() 
})

export const validMessage = Joi.object({
    nom:Joi.string().min(2).max(255).required(),
    message:Joi.string().min(2).max(10000).required()
})

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