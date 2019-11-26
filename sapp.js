var express = require('express');
var m = express();
var web = express();
var bodyParser = require("body-parser");
var favicon = require("serve-favicon");
var morgan = require("morgan");
m.use(favicon(__dirname + '/favicon.ico'));
const dh_homedir = require('os').homedir();
var dh_www = dh_homedir + '/Documents/wdOS/App/';
var fs = require('fs');
var accessLogStream = fs.createWriteStream(dh_homedir + '/Documents/wdOS/Logs/WWW_access.log', { flags: 'a' });
web.use(morgan('short', { stream: accessLogStream }));
web.use(favicon(__dirname + '/favicon.ico'));
if (fs.existsSync(dh_homedir + '/Documents/wdOS/Core/broad.json')) {
  var file = fs.readFileSync(dh_homedir + '/Documents/wdOS/Core/broad.json');
  var broad = JSON.parse(file);
  var port = broad.port;
  var serv = broad.serv;
}
else{
  fs.writeFileSync(dh_homedir + '/Documents/wdOS/Core/broad.json', '{"port": 8080, "serv": "on"}');
  var port = "8080";
  var serv = "on";
}
var file = fs.readFileSync(dh_homedir + '/Documents/wdOS/Core/pin.json');
var p = JSON.parse(file);
var x = 1;
var app = {};
var con = '<!DOCTYPE html><html><head><title>wdOS</title><link rel="stylesheet" href="Plugins/bootstrap/dist/css/bootstrap.min.css"><script src="Plugins/jquery.min.js"></script><script src="Plugins/popper.min.js"></script><script src="Plugins/bootstrap/dist/js/bootstrap.min.js"></script><style>body {background-image: url(Plugins/back.jpg); background-position: center top; background-size: 100% auto;}</style></head><body><div class="bg-dark text-center"><img src="Plugins/WebDesk.png" style="width: 50%;" alt="WebDesk"></div><br><br><div id="app" class="row container">';
for (var key in p) {
    if (p.hasOwnProperty(key)) {
        app['s' + x] = express();
        app['s' + x].use(express.urlencoded({extended: true}));
        app['s' + x].use(bodyParser.json());
        if(fs.existsSync(dh_www + key + '/favicon.ico')){
          var FAVICON = dh_www + key + '/favicon.ico';
        }
        else{
          var FAVICON = __dirname + '/favicon.ico';
        }
        app['s' + x].use(favicon(FAVICON));
        app['s' + x].use("/", express.static(dh_www + key));
        var file = fs.readFileSync(dh_www + key + '/wd.json');
        var obj = JSON.parse(file);
        var aname = obj.name.substr(0, 9);
        con = con + '<div class="col-sm-1 wd_apps" data-toggle="tooltip" title="' + obj.des + '"><a href="http://127.0.0.1:' + p[key] + '/index.html" target="_blank"><img class="card-img-bottom" src="' + key + '/ic.png" alt="' + obj.name + '" style="width:100%"></a><figcaption><a href="http://127.0.0.1:' + p[key] + '/index.html" class="text-light" target="_blank">' + aname + '</a></figcaption></div>';
        app['s' + x].use(function(req, res, next) {
            res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
        });
        var server = app['s' + x].listen(p[key], function () {
           //var host = server.address().address
           //var port = server.address().port
           //alert("Example app listening at http://%s:%s", host, port);
        });
        x = x + 1;
    }
}

m.use(express.urlencoded({extended: true}));
web.use(express.urlencoded({extended: true}));
  //m.use("/", express.static(dh_www));
    //app.use("/tb_www/", express.static(dh_www + 'tb_www/'));
  // Change the 404 message modifing the middleware

m.use("/", express.static(dh_homedir + '/Documents/wdOS/App'));
m.use("/Plugins", express.static( __dirname + '/Plugins'));
m.use("/apps", express.static(dh_homedir + '/Documents/wdOS/WebFrame'));
m.use("/WebFrame", express.static( __dirname + '/WebFrame'));
m.get('/WebFrame/apps.html', function (req, res) {
   res.send('test');
});
m.get('/', function (req, res) {
   res.send(con + '</div></body></html>');
});
m.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});
web.use("/", express.static(dh_homedir + '/Documents/wdOS/WWW'));
web.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});
m.post('/login', function(req, res) {
    var user = req.body.user;
    var pwd = req.body.pwd;
    res.send(user);
    //res.send('{"' + user + '":"' + pwd + '"}');
});
if(serv == "on"){
var server = m.listen(4000, function () {
   //var host = server.address().address
   //var port = server.address().port

   //console.log("Example app listening at http://%s:%s", host, port)
})
var server = web.listen(port, function () {
   //var host = server.address().address
   //var port = server.address().port

   //console.log("Example app listening at http://%s:%s", host, port)
})
}
