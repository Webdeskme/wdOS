$(document).ready(function(){
  const remote = require('electron').remote;
  const {ipcRenderer} = require('electron');
  var exec = require('child_process').exec;
  var fs = require('fs');
  const {shell} = require('electron');
  const wd_homedir = require('os').homedir();
  var wd_home = wd_homedir + '/Documents/wdOS/';
  $("#submit").click(function(){
    var con = '{"kioske": ';
    con += $("#k").val();
    con += ', "height": ';
    con += $("#h").val();
    con += ', "width": ';
    con += $("#w").val();
    con += ', "frame": ';
    con += $("#f").val();
    con += '}';
    //con = JSON.stringify(con);
	   fs.writeFileSync(wd_home + 'Core/set.json', con);
	    alert("Status: Saved");
  });
});
