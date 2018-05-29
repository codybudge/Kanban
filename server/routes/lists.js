var router = require('express').Router()
var Lists = require('../models/list')

//GET BY BOARD ID
router.get('/api/lists/:id', (req, res, next) => {
  Lists.find({boardId: req.params.id})//may beed quotes around board
  .then(lists => {
    res.send(lists)
  })
  .catch(err => {
    res.status(400).send(err)
  })
})

//EDIT
router.put('/api/lists/:id', (req,res) => {
  Lists.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(lists => {
    res.send(lists)
  })
  .catch(err => {
    res.status(400).send(err)
  })


})

//CREATE NEW
router.post('/api/lists/', (req, res) => {
  Lists.create(req.body)
  .then(newList => {
    res.send(newList)
  })
  .catch(err => {
    res.status(400).send(err)
  })
})

//DELETE
router.delete('/api/lists/:id', (req, res) => {
  Lists.findByIdAndRemove(req.params.id)
  .then(res => {
    res.send("Deleted!")
  })
  .catch(err => {
    res.status(400).send(err)
  })
})

module.exports = {
  router
}