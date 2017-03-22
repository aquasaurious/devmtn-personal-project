var express = require('express');
var session = require('express-session');
var cors = require('cors');
var massive = require('massive');
var bodyParser = require('body-parser');

// var connString = "postgres://postgres:hose88@127.0.0.1:3000/gibson";
const port = 8080;

var app = express();

// var corsOptions = {
//     origin: 'https://localhost:' + port
// };

// app.use(cors(corsOptions));
//console.log(cors.origin);
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('./public'));

// var db = massive.connect({connectionString : connString},
//   function(err, localdb){
//     db = localdb;
//      app.set('db', db);
    /*
     db.user_create_seed(function(){
       console.log("User Table Init");
     });
     db.vehicle_create_seed(function(){
       console.log("Vehicle Table Init")
     });
     */
// })

/*
app.get('/', function(req, res, next) {
  db.get_acoustics(function(err, prod) {
    console.log("hello from your database on ", db.connectionString);
    res.status(200).json(prod);
  })
})
*/

app.listen(port, function() {
    console.log('listening on port: ', port);
})