/* eslint-disable no-console */
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('./middlewares/logger')
require('dotenv/config')

/* 
    Express config
*/
const PORT = process.env.PORT || 3000 // PORT the server will exposse

// DataBase: MongoDB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => console.log('Connected to Database')
)

/* 
    Middlewares:
    *A function that execute when routes are being hit.
*/
app.use(bodyParser.json())
app.use(cors())
app.use(logger)

/* 
    Import routes:
    Importing routes for use in middleware routes.
    All routes are located within the routes folder.
 */
const ExampleRoute = require('./routes/example')
const authRoute = require('./routes/auth')

/* 
    Routes Middleware:
    Assign routes as middleware, to not crowd the server.js file.
*/
app.use('/app/example', ExampleRoute)
app.use('/api/users', authRoute)



app.listen(PORT, () => {
    console.log(`Server is now running on port: ${PORT}`)
})