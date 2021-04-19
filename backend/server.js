
const express = require('express')
const cors = require('cors')
const config = require("config")
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000


if (!config.get('jwtPrivateKey')){
    console.error("FATAL ERROR: jwtPrivateKey is not defined")
    process.exit(1)
}

//app.use(cors())
app.use(cors({ origin: true, credentials: true}));
app.use(express.json())
app.use(cookieParser())


const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})

const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})


const booksRouter = require('./routes/books')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const listRouter = require('./routes/lists')
const reviewRouter = require('./routes/reviews')

app.use('/api/books', booksRouter)
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)
app.use('/api/lists', listRouter)
app.use('/api/reviews', reviewRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})