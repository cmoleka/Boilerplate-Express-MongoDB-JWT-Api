/* eslint-disable consistent-return */
/* eslint-disable sort-keys */
/* eslint-disable max-len */
/* eslint-disable max-statements */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-statements-per-line */
// Importing express and express router.
// eslint-disable-next-line new-cap
const router = require('express').Router()
const User = require('../models/User')
const sha256 = require('js-sha256')
const jwt = require('jsonwebtoken')
const { registrationValidation, loginValidation } = require('../validation')

/* 
    User Registration
*/

router.post('/register', async (req, res) => {

    /* 
        Validation:
        We first validate that the registration adhere to the validation constraints.
    */
    const { error } = registrationValidation(req.body)
    if (error) { 
        return res.status(400).send(error.details[0].message)
    }

    /* 
        Check if Username already exist
   */
    const userExist = await User.findOne({
        userName: req.body.userName
    })
    if (userExist) { 
        return res.status(400).send('Username already exist.')
    }

    /* 
        Creating new user: 
        Always make sure to encrypt user's password at registration.
        Here we are using sha256 encryption.
  */
    const user = new User({
        userName: req.body.userName,
        password: sha256(req.body.password)
    })
    try {
        const savedUser = await user.save()
        res.status(201).send({ user: user._id })
    } catch (err) {
        res.json({ message: err })
    }
})

/* 
    User Login
*/
router.post('/login', async (req, res) => {

    /* 
        Validation
    */
    const { error } = loginValidation(req.body)
    if (error) { 
        return res.status(400).send(error.details[0].message) 
    }

    /* 
        Check if Username already exist
   */
    const user = await User.findOne({
        userName: req.body.userName
    })
    if (!user) { 
        return res.status(400).send('Username is not registered or Password is invalid.') 
    }

    /* 
    Check if password is correct:
    The password within the req.body must match the encrypted stored password.
  */
    if (user.password != sha256(req.body.password)) {
        return res.status(401).send('Password is invalid.') 
    }

    /* 
    Create and assign token
  */
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.status(200).header('auth-token', token).
        send(token)
})

module.exports = router