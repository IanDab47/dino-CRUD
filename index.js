// required packages
const express = require('express')
const layout =  require('express-ejs-layouts')

// express app config
const app = express()
const PORT = 3000
app.set('view engine', 'ejs')
app.use(layout)

// app middleware | Tell express to listen for request bodies send from HTML forms
app.use(express.urlencoded({ extended: false }))

// // routes
app.use('/dinosaurs', require('./controllers/dinosaurs.js'))
app.use('/prehistoric-creatures', require('./controllers/prehistoric-creatures.js'))

// route definitions
app.get('/', (req, res) => {
  res.render('home.ejs')
})

// liston on a port
app.listen(PORT, () => console.log(`is that dinos i hear on port ${PORT} 🦖`))