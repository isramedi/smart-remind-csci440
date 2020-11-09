var http = require('http');

// http.createServer(function (req, res) {
// 	res.write('Hello World'); // write a response to the client
// 	res.end(); // end the response
// }).listen(8080); // the server object listens on port 8080

// http.createServer( function (req, res) {
// 	res.writeHead(200, {'Content-Type': 'text/html'}); // 200 is status code for all is ok, second arg is object containing response headers
// 	res.write('Hello World!');
// 	res.end();
// }).listen(8080);

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(req.url); // holds the part of the url that comes after the domain name, prints it
  res.end();
}).listen(8080); 
