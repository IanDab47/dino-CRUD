// required packages
const express = require('express')
const layout =  require('express-ejs-layouts')

// express app config
const app = express()
const PORT = 3000
app.set('view engine', 'ejs')
app.use(layout)

// route definitions
app.get('/', (req, res) => {
  res.send('welcome to the dino CRUD app 🐱‍🐉')
})

// GET /dinosaurs -- show all dinos
app.get('/dinosaurs', (req, res) => {
  res.send('show all dinos')
})

// GET /dinosaurs/new -- display a form to create a new dino
app.get('/dinosaurs/new', (req, res) => {
  res.send('show a form to create a new dino')
})

// POST /dinosaurs -- create a new dino in the DB
app.post('/dinosaurs', (req, res) => {
  res.send('create a new dino in the DB')
})

// GET /dinosaurs/:id -- display the details of one specific dino
app.get('/dinosaurs/:id', (req, res) => {
  res.send(`show details for dino with id of ${req.params.id}`)
})

// liston on a port
app.listen(PORT, () => console.log(`is that dinos i hear on port ${PORT} 🦖`))