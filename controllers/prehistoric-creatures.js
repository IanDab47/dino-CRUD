const express = require('express')
const router = express.Router()
const fs = require('fs')

// get the pcs from the db
const readPCFile = () => {
  // Use the filesystem to read the pc json
  const pcs = fs.readFileSync('./prehistoric_creatures.json')

  // parse the file into json data
  const pcData = JSON.parse(pcs)

  return pcData
}

// GET /prehistoric-creatures -- show all pcs
router.get('/', (req, res) => {
  const pcData = readPCFile()
  // console.log(pcData)

  // send the pc info to the client
  // TODO: add ejs view
  res.render('prehistoric_creatures/index.ejs', { 
    pcs: pcData 
  })
})

// GET /prehistoric-creatures/new -- display a form to create a new pc
router.get('/new', (req, res) => {
  res.render('prehistoric_creatures/new.ejs')
})

// POST /prehistoric-creatures -- create a new pc in the DB
router.post('/', (req, res) => {
  // read the pc file
  const pcData = readPCFile()
  
  // payload of data from the request body (req.body)
  // push the data payload into the array of pcs
  console.log(req.body)
  pcData.push(req.body)

  // save the pc file
  fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(pcData))

  // RULE: on POST routes -- DO NOT RENDER A TEMPLATE (this rule can be broken)
  // redirect to where you can find a template
  res.redirect('/prehistoric-creatures')
})

// GET /dinosaurs/:id -- display the details of one specific dino
router.get('/1', (req, res) => {
  // get dinos from the file
  const pcData = readPCFile()

  // look up array index from the url route params
  const pc = pcData[1]

  // send back a single dino
  res.json(pc)
})

module.exports = router