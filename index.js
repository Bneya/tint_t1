var express = require('express');
const https = require('https');
const cors = require('cors');
const indexRouter = require('./routes/index');

// Create app and add middlewares
var app = express();

// onfigure ejs and static css
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(cors())


// Permite sacar POST params
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Carga las rutas con el router
app.use(`/`, indexRouter)

// Load env variables
require('dotenv').config();

// Home route
app.get('/', function (req, res) {
  res.send('Hello World!');
});

const port = process.env.PORT || 3000

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});
