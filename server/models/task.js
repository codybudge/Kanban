var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
var schemaName = 'Task'

var schema = new Schema({
  title: { type: String, required: true },
  body: { type: String, },
  userName: { type: String, required: true },
  userId: { type: String, required: true },
  boardId: { type: ObjectId, ref: 'Board', required: true},
  listId: { type: ObjectId, ref: 'List', required: true}
})

module.exports = mongoose.model(schemaName, schema)