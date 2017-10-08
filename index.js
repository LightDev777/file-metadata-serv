var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended: true});
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

//show html form file upload on index
app.get('/', function(req, res) {
  var html = "<h1>Submit a file to view its filesize.</h1>";
  html += "<form enctype='multipart/form-data' action='/getFileSize' method='post' name='form1'>";
  html += "<input name='file' type='file'>";
  html += "<input type='submit' value='Submit'>";
  html += "</form>";

  res.send(html);

});

//send file upload and show size of file
app.post('/getFileSize', upload.single('file'), function(req, res, next) {
  //console.log(req.file);
  var obj = {
    "size": req.file.size
  };
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(JSON.stringify(obj));
});

app.listen(5000);
