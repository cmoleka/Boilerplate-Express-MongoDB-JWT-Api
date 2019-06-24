/* eslint-disable sort-keys */
// Importing express router.
// eslint-disable-next-line new-cap
const router = require('express').Router()
const verify = require('../middlewares/verifyToken')

/* 
    Routes example.
    Since we imported Express.Router(), 
    all routes will be called using the "router" function,
    followed by the request type.
*/
// eslint-disable-next-line no-warning-comments
/* TODO: Async route example
   router.get('/', async (req, res) => {
   try{
   const data = 'hello'
   res.send(data)
   res.status(200)
   } catch(err) {
   res.json({ message: err })
   }
   })
   */
// * Normal route example 
router.get('/', (req, res) => {
    const data = 'Hello  you made it'
    res.send(data)
})

// * Private route example
router.get('/private', verify, (req, res) => {
    res.json({ 
        posts: { 
            title: 'Example private data',
            description: 'You will only see this is properly authenticated.' 
        }
    })
})

// Exporting the router
module.exports = router