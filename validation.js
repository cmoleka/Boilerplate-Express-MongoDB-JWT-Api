/* eslint-disable sort-keys */
/* eslint-disable newline-before-return */
/* eslint-disable newline-per-chained-call */
const Joi = require('@hapi/joi')

/* 
    User creditials validation.
    Here we model the user Schema for registration and login using Joi. 
    We define the constraints that username and passwords must have.
    For example, below you might have noticed the userName within schema Object.
    
    userName:
        - a required string
        - must contain only alphanumeric characters
        - minimum of 6 characters but no longer than 30

*/

// User Registration Validation Schema
const registrationValidation = (data) => {
    const schema = {
        userName: Joi.string().alphanum().min(6).max(30).required(),
        password: Joi.string().min(6).max(1024).required()
    }
    return Joi.validate(data, schema)
}

// User login Validation Schema
const loginValidation = (data) => {
    const schema = {
        userName: Joi.string().min(6).max(30).required(),
        password: Joi.string().min(6).max(1024).required()
    }
    return Joi.validate(data, schema)
}

module.exports = {
    registrationValidation,
    loginValidation
}