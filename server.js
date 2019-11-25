$(document).ready(function() {
  var http = require('http');
  var url = require('url');
  var fs = require('fs');
  const {shell} = require('electron');
  const wd_homedir = require('os').homedir();
  var wd_dir = wd_homedir + '/Documents' + '/wdOS/Cast/';
  if (fs.existsSync(wd_homedir + '/Documents/wdOS/Core/broad.json')) {
    var file = fs.readFileSync(wd_homedir + '/Documents/wdOS/Core/broad.json');
    var broad = JSON.parse(file);
    var port = broad.port;
    var serv = broad.serv;
  }
  else{
    fs.writeFileSync(wd_homedir + '/Documents/wdOS/Core/broad.json', '{"port": 8080, "serv": "on"}');
    var port = "8080";
    var serv = "on";
  }
  if(serv == "on"){
  //document.getElementById("files").innerHTML = '<h3>Site Map:</h3><ul>';
  var con = '<!DOCTYPE html><html><title>WebDesktop</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><body><h3>Site Map:</h3><ul>';
  files = fs.readdirSync(wd_dir);
  for (i = 0; i < files.length; i++) {
      if (fs.existsSync(wd_dir + files[i])) {
        file = fs.readFileSync(wd_dir + files[i]);
        //document.getElementById("files").innerHTML += '<li>' + files[i] +'</li>';
        con += '<li><a href="' + encodeURIComponent(files[i]) + '">' + files[i] +'</a></li>';
      }
  }
  //document.getElementById("files").innerHTML += '</ul>';
  con += '</ul></body></html>';
  fs.writeFile(wd_dir + 'map.html', con, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
  var server = http.createServer(function (req, res) {
    var pathname = decodeURIComponent(url.parse(req.url).pathname);
    var ext = pathname.split(".");
    var ftype = "html";
    if(typeof ext[1] !== 'undefined' && ext[1] != 'html'){
      if(ext[1] == 'css'){
        var ftype = "css";
      }
      else if (ext[1] == 'js') {
        var ftype = "js";
      }
      else {
        ftype ="other";
      }
  }
      switch (pathname) {
        case '/':
        if(fs.existsSync(wd_dir + 'index.html')){
          res.writeHead(200, {'Content-Type': 'text/html'});
          var myReadStream = fs.createReadStream(wd_dir + 'index.html', 'utf8');
          myReadStream.pipe(res);
        }
        else{
          res.writeHead(200, {'Content-Type': 'text/html'});
          var myReadStream = fs.createReadStream(wd_dir + 'map.html', 'utf8');
          myReadStream.pipe(res);
        }
          break;
        default:
        if(fs.existsSync(wd_dir + pathname)){
          if(ftype == "html"){
            res.writeHead(200, {'Content-Type': 'text/html'});
            var myReadStream = fs.createReadStream(wd_dir + pathname, 'utf8');
            myReadStream.pipe(res);
          }
          else if (ftype == "css") {
            res.writeHead(200, {'Content-Type': 'text/css'});
            var myReadStream = fs.createReadStream(wd_dir + pathname, 'utf8');
            myReadStream.pipe(res);
          }
          else if (ftype == "js") {
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            var myReadStream = fs.createReadStream(wd_dir + pathname, 'utf8');
            myReadStream.pipe(res);
          }
          else{
            //res.download(wd_dir + pathname);
            fs.readFile(wd_dir + pathname, function(err, data) {
      res.writeHead(200, {'Content-Type': 'application/octet-stream'}, {'Content-Disposition': 'attachment'});
      res.write(data);
      res.end();
    });
        }
        //var myReadStream = fs.createReadStream(wd_dir + pathname, 'utf8');
      }
      else{
        res.writeHead(200, {'Content-Type': 'text/html'});
        var myReadStream = fs.createReadStream(wd_dir + 'map.html', 'utf8');
        myReadStream.pipe(res);
      }
      }
      //myReadStream.pipe(res);
  }).listen(4001);
}
});
