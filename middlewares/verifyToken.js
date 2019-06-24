/* eslint-disable callback-return */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken')

/* 
    Token verification:
    Here we verify that the token located within the header is the correct one.
    We also have an handler if the token is not available or expired, 
    which returns a 401 status. 

    The usecase here is to create authenticated routes.
*/


module.exports = function (req, res, next) {
    const token = req.header('auth-token')
    if (!token) { 
        return res.status(401).send('Access Denied')
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch (err) {
        res.status(400).send('Invalid Token')
    }
}