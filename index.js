const express = require('express')

const app = express()
const port = 3000
app.set('view engine', 'ejs')
app.set('views', './templates/views')
const currentUser = {
    loggedIn: false
}

const protectedRoutes = [
    '/about',
    '/contact'
]
app.use((req, res, next) => {
    console.log(`Request made to ${req.path} at ${new Date()}`)
    if (!currentUser.loggedIn) {
        if (protectedRoutes.includes(req.path)) {
            return res.redirect('/')
        }
    }
    next()
})
app.get('/about', (req, res) => {
    res.send('About Page')
})

app.get('/contact', (req, res) => {
    res.send('Contact Page')
})

app.get('/blog', (req, res) => {
    res.send('Blog Page')
})

app.listen(port, () => {
    console.log(`Express is running on port ${port}...`)
})