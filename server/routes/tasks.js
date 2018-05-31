var router = require('express').Router()
var Tasks = require('../models/task')

//GET BY LIST ID
router.get('/api/tasks/:id', (req, res, next) => {
  Tasks.find({listId: req.params.id})//may beed quotes around board
  .then(tasks => {
    res.send(tasks)
  })
  .catch(err => {
    res.status(400).send(err)
  })
})

//EDIT
router.put('/api/tasks/:id', (req,res) => {
  Tasks.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(tasks => {
    res.send(tasks)
  })
  .catch(err => {
    res.status(400).send(err)
  })


})

//CREATE NEW
router.post('/api/tasks/', (req, res) => {
  Tasks.create(req.body)
  .then(newTask => {
    res.send(newTask)
  })
  .catch(err => {
    res.status(400).send(err)
  })
})

//DELETE
router.delete('/api/tasks/:id', (req, res) => {
  Tasks.findByIdAndRemove(req.params.id)
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