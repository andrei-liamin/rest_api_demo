var express = require('express');
var bodyParser = require('body-parser');
var app = express();
// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use(bodyParser.json());
var fs = require("fs");

let inMemoryData = [];
fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
  inMemoryData = JSON.parse(data);
});

app.get('/listUsers', function (req, res) {
  res.end(JSON.stringify(inMemoryData));
})

app.post('/addUser', function (req, res) {
  const newUser = req.body;
  inMemoryData.push(newUser);
  res.end("{}");
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})