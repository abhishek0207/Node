const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

hbs.registerPartials(__dirname + "/views/partials")
hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear()
})
var myApp = express()
myApp.set('view engine', 'hbs')
myApp.use(express.static(__dirname + '/public'))
myApp.use((req, res, next) => {
    var now = new Date().toString()
    fs.appendFileSync('server.log',`${now}: ${req.method} ${req.url} \n`)
    next()
})
myApp.use((req, res, next) => {
   res.render('maintenance.hbs')
})
myApp.get('/', (req, res) => {
res.render('home.hbs', {
    title: 'Abhishek\'s node js world',
    Message: 'Welcome to Abhishek\'s node js world',
})
})

myApp.get('/about', (req, res) => {
 res.render('about.hbs', {
     title: 'About Page',
 })
})
myApp.get('/bad', (req, res) => {
res.send({
    errorMessage: "hey this is a bad Request!"
})
})

myApp.listen(3000, () => {
    console.log("server is up on port 3000")
});