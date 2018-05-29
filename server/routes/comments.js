var router = require('express').Router()
var Comments = require('../models/comment')

//GET BY BOARD ID
router.get('/api/comments/:id', (req, res, next) => {
  Comments.find({taskId: req.params.id})//may beed quotes around board
  .then(comments => {
    res.send(comments)
  })
  .catch(err => {
    res.status(400).send(err)
  })
})

//EDIT
router.put('/api/lists/:id', (req,res) => {
  Comments.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(comments => {
    res.send(comments)
  })
  .catch(err => {
    res.status(400).send(err)
  })


})

//CREATE NEW
router.post('/api/comments/', (req, res) => {
Comments.create(req.body)
  .then(newComment => {
    res.send(newComment)
  })
  .catch(err => {
    res.status(400).send(err)
  })
})

//DELETE
router.delete('/api/comments/:id', (req, res) => {
  Comments.findByIdAndRemove(req.params.id)
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