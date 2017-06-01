var PORT = 9999;

var http = require('http');
var path = require('path');
var fs = require('fs');
var url = require('url');
var mime = require('./mime').types;
var config = require('./config');

var server = http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname; // /index.html
    var realPath = 'assest' + pathname; // assest/index.html
    var ext = path.extname(realPath);   // .html
    ext = ext ? ext.slice(1) : 'unknown';   // html
    var contentType = {
        'Content-type': mime[ext] || 'text/plain' // text/html
    }

    fs.exists(realPath, function(exists) {
        if (!exists) {
            response.writeHead(404, contentType);
            response.write('This request URL: ' + pathname + ' is not found on this server.');
            response.end();
        } else {
            fs.readFile(realPath, 'binary', function(err, file) {
                if (err) {
                    response.writeHead(500, contentType);
                    response.end(err);
                } else {
                    response.writeHead(200, contentType);
                    response.write(file, 'binary');
                    response.end();
                }
            });
        }
    });
});

server.listen(PORT);

console.log('Server listening on ' + PORT);