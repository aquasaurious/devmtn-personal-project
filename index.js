
var ServerConfig = require('./server_config.js');

var express = require('express');
var session = require('express-session');
var cors = require('cors');
var massive = require('massive');
var bodyParser = require('body-parser');

var connString = "postgres://postgres:hose88@127.0.0.1:3000/gibson";
const port = 8080;

var app = express();


var guitars = require('./controllers/guitar_selector.js');
// var corsOptions = {
//     origin: 'https://localhost:' + port
// };

// app.use(cors(corsOptions));
//console.log(cors.origin);
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('./public'));

 var db = massive.connect({connectionString : connString},
   function(err, localdb){
     db = localdb;
      app.set('db', db);
    
     
 })

/*
app.get('/', function(req, res, next) {
  db.get_guitars(function(err, prod) {
    console.log("hello from your database on ", db.connectionString);
    res.status(200).json(prod);
  })
})
*/

app.post('/guitars', function(req, res, next) {
  for (var i=0; i < guitars.length; i++) {
    guitar = guitars[i];
    console.log(guitar);
    db.insert_guitar(guitar.classification, guitar.imgsrc, guitar.model, guitar.qualities, guitar.price, function(err, prod) {
      console.log(err, prod);
      res.status(200).send('bonsoir monsoiur');
    })
  }
})

app.get('/guitars', function(req, res, next) {
  db.get_guitars (function(err, prod) {
    res.status(200).json(prod);
  })
})

app.listen(port, function() {
    console.log('listening on port: ', port);
})