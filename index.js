var express = require('express');
var session = require('express-session');
var cors = require('cors');
var massive = require('massive');
var bodyParser = require('body-parser');

var app = express();

const port = 6666;