var router = require('express').Router()
var Boards = require('../models/board')

//GET ALL
router.get('/api/boards/:id', (req, res, next) => {
  Boards.find({userId: req.params.id})
  .then(boards => {
    res.send(boards)
  })
  .catch(err => {
    res.status(400).send(err)
  })
})

//EDIT
router.put('/api/boards/:id', (req,res) => {
  Boards.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(boards => {
    res.send(boards)
  })
  .catch(err => {
    res.status(400).send(err)
  })


})

//CREATE NEW
router.post('/api/boards/', (req, res) => {
  Boards.create(req.body)
  .then(newBoard => {
    res.send(newBoard)
  })
  .catch(err => {
    res.status(400).send(err)
  })
})

//DELETE
router.delete('/api/boards/:id', (req, res) => {
  Boards.findByIdAndRemove(req.params.id)
  .then(() => {
    res.send("Deleted!")
  })
  .catch(err => {
    res.status(400).send(err)
  })
  
})

module.exports = {
  router
}