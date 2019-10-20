$(document).ready(function() {
  var http = require('http');
  var url = require('url');
  var fs = require('fs');
  var os = require('os');
  var ifaces = os.networkInterfaces();

  Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
  if ('IPv4' !== iface.family || iface.internal !== false) {
  // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
  return;
  }
  var myIP = "";
  if (alias >= 1) {
  // this single interface has multiple ipv4 addresses
  myIP += '<p><b>Go to: </b><u><i><a href="http://' + iface.address + ':8080" target="_blank">' + iface.address + ':8080</a></i></u> in your web browser.</p>';
  } else {
  // this interface has only one ipv4 adress
  myIP += '<p><b>Go to: </b><u><i><a href="http://' + iface.address + ':8080" target="_blank">' + iface.address + ':8080</a></i></u> in your web browser.</p>';
  }
  ++alias;
  document.getElementById("myip").innerHTML = myIP;
  });
  //document.getElementById("myip").innerHTML = myIP;
  });
});
