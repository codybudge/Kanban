var mongoose = require('mongoose')
var connectionString = "mongodb://test:test@ds016298.mlab.com:16298/kanban"
var connection = mongoose.connection


mongoose.connect(connectionString)

connection.on('error', err=>{
  console.log('ERROR FROM DATABASE: ', err)
})


connection.once('open', ()=>{
  console.log('Connected to Database')
})