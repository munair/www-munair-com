var express = require('express');
var fs = require('fs');

var app = express();

app.use("/css", express.static(__dirname + '/css'));
app.use("/img", express.static(__dirname + '/img'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/video", express.static(__dirname + '/video'));
app.use("/sounds", express.static(__dirname + '/sounds'));

app.get('/', function(request, response) { var htmlBuffer = fs.readFileSync('index.html', 'utf-8'); response.send(htmlBuffer); });

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
