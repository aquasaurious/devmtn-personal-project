
var ServerConfig = require('./server_config.js');

var express = require('express');
var session = require('express-session');
var cors = require('cors');
var massive = require('massive');
var bodyParser = require('body-parser');

var connString = "postgres://xejkelis:VaOlrEOnc3t0QDedLzDVho4rb5N2FgPG@stampy.db.elephantsql.com:5432/xejkelis";
const port = 8080;

var app = express();


var guitars = require('./controllers/guitar_selector.js');

//console.log(cors.origin);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('./public'));

var db = massive.connect({connectionString : connString},
   function(err, localdb){
     console.log("massive err: ", err, ":", localdb.insert_guitar);
     db = localdb;
    
     
 })


app.get('/', function(req, res, next) {
  db.get_guitars(function(err, prod) {
    console.log("hello from your database on ", db.connectionString);
    console.log("db get err: ", err);
    res.status(200).json(prod);
  })
})


app.post('/guitars', function(req, res, next) {
  for (var i=20; i < 24; i++) {
    guitar = guitars[i];
    //console.log(guitar);
    setTimeout(function(){console.log("inserting" + guitars[i].model)}, 2000);
    db.insert_guitar(guitar.classification, guitar.imgsrc, guitar.model, guitar.qualities, guitar.price, function(err, prod) {
      res.status(200);
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