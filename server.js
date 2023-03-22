const express = require('express')
const dotenv = require('dotenv')
const { connectDB } = require('./src/db')
const { User, Post } = require('./src/models')

dotenv.config()
connectDB()

const app = express()

require('./src/routes')(app)

app.get('/', async (req,res)=>{

    res.send('Hello WORlD')
})

app.listen(process.env.PORT, ()=>{
    console.log(`Tweetr running on port ${process.env.PORT}`)
})
