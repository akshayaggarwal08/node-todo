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

// list
app.listen(8080);
console.log("App listening on port 8080");
