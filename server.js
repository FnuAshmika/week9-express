const express = require('express')
const dotenv = require('dotenv')
const { connectDB } = require('./src/db')
const { User, Post } = require('./src/models')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./src/graphql/schema')
const cookieParser = require('cookie-parser')
const { authenticate } = require('./src/middleware/authenticate')
const { userData } = require('./src/middleware/userData')


dotenv.config()
connectDB()

const app = express()
app.set('view engine', 'ejs')
app.set('views','./src/templates/views')
app.use(cookieParser())
app.use(authenticate)
app.use(userData)
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.use(express.urlencoded({ extended: true }))

require('./src/routes')(app)

app.get('/', async (req,res)=>{

    res.send('Hello WORlD')
})

app.listen(process.env.PORT, ()=>{
    console.log(`Tweetr running on port ${process.env.PORT}`)
})
