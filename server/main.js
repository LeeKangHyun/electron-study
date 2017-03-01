var http = require('http');
var fs = require('fs');
var path = require('path');
var port = 52273;

http.createServer(function (req, res) {
  var filePath = req.url;
  if ('/' == filePath) {
    filePath = '/index.html';
  }
  var extname = path.extname(filePath);
  var contentType = 'text/html';
  switch(extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
  }
  try {
    fs.readFile('src'+filePath, function(err, content) {
      if (err) {
        throw new Error(err);
      }
      else {
        res.writeHead(200, {'Content-Type': contentType});
        res.end(content, 'utf-8');
      }
    });
  } catch (err) {
    console.log(err);
  }
}).listen(port, function () {
  console.log('Server running at http://localhost.52273/');
});