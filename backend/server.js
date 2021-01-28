
const express = require('express')
const cors = require('cors')
const config = require("config")
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000


if (!config.get('jwtPrivateKey')){
    console.error("FATAL ERROR: jwtPrivateKey is not defined")
    process.exit(1)
}

app.use(cors())
app.use(express.json())


const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})

const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})


const testRouter = require('./routes/test')
const booksRouter = require('./routes/books')
const usersRouter = require('./routes/users')
const testusersRouter = require('./routes/testusers')
const authRouter = require('./routes/auth')

app.use('/test', testRouter)
app.use('/books', booksRouter)
app.use('/users', usersRouter)
app.use('/testusers', testusersRouter)
app.use('/auth', authRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})