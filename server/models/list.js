var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
var schemaName = 'List'

var schema = new Schema({
  title: { type: String, required: true },
  body: { type: String, },
  userName: { type: String, required: true },
  userId: { type: String, required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true}
})

module.exports = mongoose.model(schemaName, schema)