const express = require('express')
const router = express.Router()
const fs = require('fs')

// get the dinos from the db
const readDinoFile = () => {
  // Use the filesystem to read teh dino json
  const dinosaurs = fs.readFileSync('./dinosaurs.json')

  // parse the file into json data
  const dinoData = JSON.parse(dinosaurs)

  return dinoData
}

// GET /dinosaurs -- show all dinos
router.get('/', (req, res) => {
  const dinoData = readDinoFile()
  // console.log(dinoData)

  // send the dino info to the client
  // TODO: add ejs view
  res.render('dinos/index.ejs', { 
    dinos: dinoData 
  })
})

// GET /dinosaurs/new -- display a form to create a new dino
router.get('/new', (req, res) => {
  res.render('dinos/new.ejs')
})

// POST /dinosaurs -- create a new dino in the DB
router.post('/', (req, res) => {
  // read the dino file
  const dinoData = readDinoFile()
  
  // payload of data from the request body (req.body)
  // push the data payload into the array of dinos
  console.log(req.body)
  dinoData.push(req.body)

  // save the dino file
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

  // RULE: on POST routes -- DO NOT RENDER A TEMPLATE (this rule can be broken)
  // redirect to where you can find a template
  res.redirect('/dinosaurs')
})

// GET /dinosaurs/:id -- display the details of one specific dino
router.get('/:id', (req, res) => {
  // get dinos from the file
  const dinoData = readDinoFile()

  // look up array index from the url route params
  const dino = dinoData[req.params.id]

  // send back a single dino
  res.json(dino)
})

module.exports = router