$(document).ready(function(){
  const remote = require('electron').remote;
  const {ipcRenderer} = require('electron');
  var exec = require('child_process').exec;
  //$("#history").html('<button class="btn btn-outline-secondary" id="last">Last Used</button>');
    $("#w1").click(function(){
        ipcRenderer.send('w1', "file://" + __dirname + "/browser.html");
    });
    $("#w2").click(function(){
        ipcRenderer.send('w2', "file://" + __dirname + "/browser.html");
     });
    $("#w3").click(function(){
        ipcRenderer.send('w3', "file://" + __dirname + "/browser.html");
    });
    $("#w4").click(function(){
        ipcRenderer.send('w4', "file://" + __dirname + "/browser.html");
    });
    $("#browser1").click(function(){
        ipcRenderer.send('show-child', "file://" + __dirname + "/browser.html");
    });
    $("#browser2").click(function(){
        ipcRenderer.send('show-child2', "file://" + __dirname + "/browser.html");
     });
    $("#browser3").click(function(){
        ipcRenderer.send('show-child3', "file://" + __dirname + "/browser.html");
    });
    $("#browser4").click(function(){
        ipcRenderer.send('show-child4', "file://" + __dirname + "/browser.html");
    });
});
