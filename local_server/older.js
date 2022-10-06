#!/usr/bin/env node

var fs = require('fs');
var http = require('http');
var path = require('path');
var url = require('url');
var runner = require('child_process');

//parse options
var args = process.argv.slice(2);
var dir = path.resolve('.');
var opt = {
  port: '8080',
  openBrowser: true,
  startPage: 'index.html'
};
for (var i = 0; i < args.length; i++) {
  if (args[i] == '-p')
    opt.port = i < args.length - 1 ? args[i + 1] : opt.port;
  else if (args[i] == '-d')
    opt.openBrowser = false;
  else if (args[i] == '-i')
    opt.startPage = i < args.length - 1 ? args[i + 1] : opt.startPage;
  else if (i == 0)
    dir = path.resolve(args[i]);
}
console.log(`options: path=${dir}, port=${opt.port}, openBrowser=${opt.openBrowser}, startPage=${opt.startPage}`);

//web server
var server = http.createServer((req, res) => {
  console.log(`${req.method}: ${req.url}`);

  var file = url.parse(req.url).pathname;
  if (file == null || file == '/' || file == '\\')
    file = path.join(dir, opt.startPage);
  else
    file = path.join(dir, file);

  var stream = fs.createReadStream(file);
  stream.on('error', (err) => {
    console.log(`can not find or open file: ${file}, ${err}`);
    res.writeHead(404, 'Not found');
    res.end();
  });

  const ext = path.parse(file).ext;
  const map = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.php': 'text/html',
    '.txt': 'text/plain',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.mp4': 'video/mp4',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword'
  };
  var contentType = map[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    stream.pipe(res);
});

server.listen(opt.port, (err) => {
  if (err)
    return console.log(`can not start listening on port: ${opt.port}, ${err}`);

  console.log(`starting server: http://localhost:${opt.port}`);
});

if (opt.openBrowser) {
  var startUrl = `http://localhost:${opt.port}`;
  var start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
  runner.exec(start + ' ' + startUrl);
}