var express = require('express')
var bp = require('body-parser')
var app = express()
let server = require('http').createServer(app)
var cors = require('cors')
var port = process.env.PORT || 3000




//Fire up database connection
require('./db')


var whitelist = ['http://localhost:8080', 'https://ej-kanban.herokuapp.com'];
var corsOptions = {
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
		callback(null, originIsWhitelisted);
	},
	credentials: true
};
app.use(cors(corsOptions))

app.use(express.static(__dirname+"/../www/dist"))

//REGISTER MIDDLEWEAR
app.use(bp.json())
app.use(bp.urlencoded({ 
  extended: true}))

  let auth = require('./auth/routes')
app.use(auth.session)
app.use(auth.router)

//gateKeeper
app.use((req,res,next)=>{
  if (!req.session.uid) {
    return res.status(401).send({
      error: 'please login to continue'
    })
  }
  next()
})

var boards = require('./routes/boards')
var lists = require('./routes/lists')
var tasks = require('./routes/tasks')
var comments = require('./routes/comments')



app.use(boards.router)
app.use(lists.router)
app.use(tasks.router)
app.use(comments.router)

//Catch All
app.get('*', (req, res, next)=>{
  res.status(404).send({error: 'No matching routes'})
})

//port listener
app.listen(port, ()=>{
  console.log('server running on port', port)
})