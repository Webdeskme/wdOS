$(document).ready(function(){
  const remote = require('electron').remote;
  const {ipcRenderer} = require('electron');
  var exec = require('child_process').exec;
  //$("#history").html('<button class="btn btn-outline-secondary" id="last">Last Used</button>');
    $("#t1").click(function(){
        ipcRenderer.send('wifi-url', "https://duckduckgo.com/");
    });
    $("#t2").click(function(){
        ipcRenderer.send('wifi-url2', "https://duckduckgo.com/");
     });
    $("#t3").click(function(){
        ipcRenderer.send('wifi-url3', "https://duckduckgo.com/");
    });
    $("#t4").click(function(){
        ipcRenderer.send('wifi-url4', "https://duckduckgo.com/");
    });
    $("#s1").click(function(){
        ipcRenderer.send('show-url', "https://duckduckgo.com/");
    });
    $("#s2").click(function(){
        ipcRenderer.send('show-url2', "https://duckduckgo.com/");
     });
    $("#s3").click(function(){
        ipcRenderer.send('show-url3', "https://duckduckgo.com/");
    });
    $("#s4").click(function(){
        ipcRenderer.send('show-url4', "https://duckduckgo.com/");
    });
});
