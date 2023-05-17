const express = require('express')
const Controller = require('./controllers')
const { setupDB } = require('./db/setup')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.set('view engine', 'ejs')
app.set('public', './public')

app.get('/', Controller.login)
app.post('/login', Controller.postLogin)
app.get('/register', Controller.register)
app.post('/register', Controller.postRegister)
app.get('/data', Controller.data)

setupDB(() => {
  app.listen(port, () => console.log(`Listening in port ${port}`))
})