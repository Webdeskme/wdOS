var express = require('express');
var m = express();
var web = express();
var bodyParser = require("body-parser");
var favicon = require("serve-favicon");
var morgan = require("morgan");
var os = require('os');
var ifaces = os.networkInterfaces();
m.use(favicon(__dirname + '/favicon.ico'));
web.use(favicon(__dirname + '/favicon.ico'));
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

        Object.keys(ifaces).forEach(function (ifname) {
        ifaces[ifname].forEach(function (iface) {
		  if ('IPv4' !== iface.family || iface.internal !== false) {
		  // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
		  return;
		  }

        con = con + '<div class="col-sm-1 wd_apps" data-toggle="tooltip" title="' + obj.des + '"><a href="http://' + iface.address + ':' + p[key] + '/index.html" target="_blank"><img class="card-img-bottom" src="' + key + '/ic.png" alt="' + obj.name + '" style="width:100%"></a><figcaption><a href="http://' + iface.address + ':' + p[key] + '/index.html" class="text-light" target="_blank">' + aname + '</a></figcaption></div>';

        });
	});

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

  var cona = '<style>body {background-image: url(../Plugins/back.jpg); background-position: center top; background-size: 100% auto;}</style><div class="jumbotron text-center"><h1>My Apps</h1></div><div class="container"><ul class="list-group">';
  files = fs.readdirSync(dh_homedir + '/Documents/wdOS/WebFrame');
  for (i = 0; i < files.length; i++) {
    cona = cona + '<a href="desktop.html?app=' + files[i] + '&sec=index" class="list-group-item list-group-item-action">' + files[i] + '</a>';
  }
  cona = cona + '</ul></div>';
m.use("/", express.static(dh_homedir + '/Documents/wdOS/App'));
m.use("/Plugins", express.static( __dirname + '/Plugins'));
web.use("/Plugins", express.static( __dirname + '/Plugins'));
web.use("/apps", express.static(dh_homedir + '/Documents/wdOS/WebFrame'));

web.post('/post', function (req, res) {
   var user = req.body.user;
   var pwd = req.body.pwd;
   afile = JSON.parse(fs.readFileSync(dh_homedir + '/Documents/wdOS/Core/webframe.json'));
   $.post(afile["url"] + "/login",{ac: afile["ac"], key: afile["key"], user: user, pwd: pwd}, function(data, status){
   //alert("Data: " + data + "\nStatus: " + status);
   res.send(data);
  });
});

web.post('/sub', function (req, res) {
	var user = req.body.user;
   var token = req.body.token;
   afile = JSON.parse(fs.readFileSync(dh_homedir + '/Documents/wdOS/Core/webframe.json'));
   $.post(afile["url"] + "/check",{ac: afile["ac"], key: afile["key"], user: user, token: token}, function(data, status){
	   if(data !== "Bad"){
		   var sec = req.body.sec;
			var app = req.body.app;
			var tools = require(dh_homedir + '/Documents/wdOS/WebFrame/' + app + '/' + sec + '.njs');
			res.send(tools.c(req));
	   }
	   else{
			res.send('');
		}
   });
});

web.post('/read', function (req, res) {
	var user = req.body.user;
   var token = req.body.token;
   var app = req.body.app;
   var file = req.body.file;
   afile = JSON.parse(fs.readFileSync(dh_homedir + '/Documents/wdOS/Core/webframe.json'));
   $.post(afile["url"] + "/get",{ac: afile["ac"], key: afile["key"], user: user, token: token, db: app, file: file}, function(data, status){
	   if(data !== "Bad"){
			res.send(data);
	   }
	   else{
			res.send('');
		}
   });
});

web.post('/write', function (req, res) {
	var user = req.body.user;
   var token = req.body.token;
   var app = req.body.app;
   var file = req.body.file;
   var con = req.body.con;
   afile = JSON.parse(fs.readFileSync(dh_homedir + '/Documents/wdOS/Core/webframe.json'));
   $.post(afile["url"] + "/post",{ac: afile["ac"], key: afile["key"], user: user, token: token, db: app, file: file, data: con}, function(data, status){
	   if(data !== "Bad"){
			res.send(data);
	   }
	   else{
			res.send('');
		}
   });
});

web.post('/check', function (req, res) {
   var user = req.body.user;
   var token = req.body.token;
   afile = JSON.parse(fs.readFileSync(dh_homedir + '/Documents/wdOS/Core/webframe.json'));
   $.post(afile["url"] + "/check",{ac: afile["ac"], key: afile["key"], user: user, token: token}, function(data, status){
   //alert("Data: " + data + "\nStatus: " + status);
   res.send(data);
  });
  //res.send(req.body.user);
});

web.get('/app.html', function (req, res) {
	var user = req.query.wf_u;
	var token = req.query.wf_t;
	afile = JSON.parse(fs.readFileSync(dh_homedir + '/Documents/wdOS/Core/webframe.json'));
   $.post(afile["url"] + "/check",{ac: afile["ac"], key: afile["key"], user: user, token: token}, function(data, status){
	   if(data !== "Bad"){
			var p = req.query.wf_p;
			var a = req.query.wf_a;
			if (fs.existsSync(dh_homedir + '/Documents/wdOS/WebFrame/' + a + '/' + p + '.njs')) {
				var page = require(dh_homedir + '/Documents/wdOS/WebFrame/' + a + '/' + p + '.njs');
				var py = page.c(req.query);
			}
			else{
				var py = "";
			}
			res.send(py);
		}
		else{
			res.send('');
		}
	});
});

web.use("/", express.static(dh_homedir + '/Documents/wdOS/WWW'));
web.use("/", express.static( __dirname + '/WebFrame'));
web.get('/apps.html', function (req, res) {
   res.send(cona);
});
m.get('/', function (req, res) {
   res.send(con + '</div></body></html>');
});
m.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});
web.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
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
