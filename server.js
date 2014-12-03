// server.js

// set up
var express         = require('express');
var app             = express();                  // Create app with Express
var mongoose        = require('mongoose');        // Mongo object modeling
var morgan          = require('morgan');          // Log requests to console
var bodyParser      = require('body-parser');     // Pull information from POST
var methodOverride  = require("method-override")  // Sim DELETE and PUT


// config
mongoose.connect('mongodb://localhost/node-todo')

app.use(express.static(__dirname + '/public'));                       // Static file direction
app.use(morgan('dev'));                                               // Log requests to console
app.use(bodyParser.urlencoded({'extended' : 'true'}));                // Parse urlencoded
app.use(bodyParser.json());                                           // Parse json
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));        // Parse vnd.api+json as json
app.use(methodOverride());


// model definition
var Todo = mongoose.model('Todo', {
  text : String
});


// REST routes

  // get todos
  app.get('/api/todos', function(req, res){

    //mongoose gets all the todos in the db
    Todo.find(function(err, todos){

      // if error, send an error
      if (err)
        res.send(err)

      res.json(todos) // return todos in JSON
    });
  });

  //create todo and get todos after they are created
  app.post('/api/todos', function(req, res){

    // create a todo, information provided by AJAX call
    Todo.create({
      text : req.body.text,
      done : false
    }, function(err, todo){
      if (err)
        res.send(err);

      // get all the todos after creation
      Todo.find(function(err, todos){
        if (err)
            res.send(err)
          res.json(todos);
      });
    });
  });

  // delete a todo
  app.delete('/api/todos/:todo_id', function(req, res){
    Todo.remove({
      _id : req.params.todo_id
    }, function (err, todo) {
      if (err)
        res.send(err)

      // get all the todos after deletion
      Todo.find(function(err, todos){
        if (err)
          res.send(err)
        res.json(todos);
      });
    });
  });


// application route
app.get('*', function(req, res){
  res.sendfile('./public/index.html') // load the single static file
});


// listen
app.listen(8080);
console.log("App listening on port 8080");
