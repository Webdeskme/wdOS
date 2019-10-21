const {app, BrowserView, BrowserWindow} = require('electron')
const {ipcMain} = require('electron')
const electron = require('electron')
/*var fs = require('fs');
const wd_homedir = require('os').homedir();
var wd_home = wd_homedir + '/Documents/wdOS/';
if (!fs.existsSync(wd_home)) {
  fs.mkdirSync(wd_home);
}
var wd_dir = wd_home + 'App/';
if (!fs.existsSync(wd_dir)) {
  fs.mkdirSync(wd_dir);
}
var wd_dir = wd_home + 'Docs/';
if (!fs.existsSync(wd_dir)) {
  fs.mkdirSync(wd_dir);
}
var wd_dir = wd_home + 'Core/';
if (!fs.existsSync(wd_dir)) {
  fs.mkdirSync(wd_dir);
}
if (fs.existsSync(wd_home + '/Core/set.json')) {
      var file = fs.readFileSync(wd_home + '/Core/set.json');
      var obj = JSON.parse(file);
      var w = obj.width;
      var h = obj.height;
      var k = obj.kioske;
      var l = obj.multiWindow;
      var f = obj.frame;
    }
    else{
      var w = 800;
      var h = 600;
      var k = true;
      var l = 'n';
      var f = false;
    }*/
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let win
/////////////////////////////BrowserView.getAllViews()/////////////////////////////////////////////////////////////////////////
  function createWindow () {
    const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
    var fs = require('fs');
    const wd_homedir = require('os').homedir();
    var wd_home = wd_homedir + '/Documents/wdOS/';
    if (!fs.existsSync(wd_home)) {
      fs.mkdirSync(wd_home);
    }
    var wd_dir = wd_home + 'App/';
    if (!fs.existsSync(wd_dir)) {
      fs.mkdirSync(wd_dir);
    }
    var wd_dir = wd_home + 'Docs/';
    if (!fs.existsSync(wd_dir)) {
      fs.mkdirSync(wd_dir);
    }
    var wd_dir = wd_home + 'Core/';
    if (!fs.existsSync(wd_dir)) {
      fs.mkdirSync(wd_dir);
    }
    var wd_dir = wd_home + 'WWW/';
    if (!fs.existsSync(wd_dir)) {
      fs.mkdirSync(wd_dir);
    }
    if (fs.existsSync(wd_home + 'Core/set.json')) {
          var file = fs.readFileSync(wd_home + 'Core/set.json');
          var obj = JSON.parse(file);
          var w = obj.width;
          var h = obj.height;
          var k = obj.kioske;
          var f = obj.frame;
          var d = obj.dev;
        }
        else{
          fs.writeFileSync(wd_home + 'Core/set.json', '{"kioske": "c", "height": 600, "width": 800, "frame": true, "dev": "off"}');
          var w = 800;
          var h = 600;
          var k = "c";
          var f = true;
          var d = "off";
        }
        if(k == "k"){
          var kiosk = true;
          w = width;
          h = height;
        }
        else if(k == "f"){
          w = width;
          h = height;
        }
    // Create the browser window.
    win = new BrowserWindow({width: w, height: h, frame: f, backgroundColor: '#2e2c29', kiosk: kiosk, webPreferences: {
    nodeIntegration: true
  }})
    //let child = new BrowserWindow({ parent: win, modal: false, show: false, width: 800, height: 600, webPreferences: {nodeIntegration: true}})
  let admin = new BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: true, webviewTag: true}})
  let adminURL = new BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: false, webviewTag: true}})
  let help = new BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: true, webviewTag: true}})
  let view = new BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: true, webviewTag: true}})
  let view2 = new BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: true, webviewTag: true}})
  let view3 = new BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: true, webviewTag: true}})
  let view4 = new BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: true, webviewTag: true}})
  let webv = new BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: false, webviewTag: true}})
  let webv2 = new BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: false, webviewTag: true}})
  let webv3 = new BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: false, webviewTag: true}})
  let webv4 = new BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: false, webviewTag: true}})
win.setBrowserView(view)
//wstart = width*0.04;
var contentWidth = win.innerWidth;
var nheight = h - 30;
//hstart = height*0.9;
admin.setBounds({ x: 0, y: 80, width: w, height: nheight })
admin.setAutoResize({width: true, height: true});
admin.webContents.loadURL('file://' + __dirname + '/history.html')
adminURL.setBounds({ x: 0, y: 80, width: w, height: nheight })
adminURL.setAutoResize({width: true, height: true});
adminURL.webContents.loadURL('https://www.webfra.me')
help.setBounds({ x: 0, y: 80, width: w, height: nheight })
help.setAutoResize({width: true, height: true});
help.webContents.loadURL('file://' + __dirname + '/Help/index.html')
view.setBounds({ x: 0, y: 80, width: w, height: nheight })
view.setAutoResize({width: true, height: true});
view.webContents.loadURL('file://' + __dirname + '/browser.html')
view2.setBounds({ x: 0, y: 80, width: w, height: nheight })
view2.setAutoResize({width: true, height: true});
view2.webContents.loadURL('file://' + __dirname + '/browser.html')
view3.setBounds({ x: 0, y: 80, width: w, height: nheight })
view3.setAutoResize({width: true, height: true});
view3.webContents.loadURL('file://' + __dirname + '/browser.html')
view4.setBounds({ x: 0, y: 80, width: w, height: nheight })
view4.setAutoResize({width: true, height: true});
view4.webContents.loadURL('file://' + __dirname + '/browser.html')
webv.setBounds({ x: 0, y: 80, width: w, height: nheight })
webv.setAutoResize({width: true, height: true});
webv.webContents.loadURL('https://duckduckgo.com/')
webv2.setBounds({ x: 0, y: 80, width: w, height: nheight })
webv2.setAutoResize({width: true, height: true});
webv2.webContents.loadURL('https://duckduckgo.com/')
webv3.setBounds({ x: 0, y: 80, width: w, height: nheight })
webv3.setAutoResize({width: true, height: true});
webv3.webContents.loadURL('https://duckduckgo.com/')
webv4.setBounds({ x: 0, y: 80, width: w, height: nheight })
webv4.setAutoResize({width: true, height: true});
webv4.webContents.loadURL('https://duckduckgo.com/')

//view.loadFile('browser.html')
    // and load the index.html of the app.
    win.loadFile('index.html')
    //child.loadFile('browser.html')
    //webv.hide();




    //var oapps = BrowserView.getAllViews;
    //for (i = 0; i < oapps.length; i++) {
    //  console.log(oapps[i]);
    //}




    // Open the DevTools.
    //win.webContents.openDevTools()
    if(d == "on"){
      view.webContents.openDevTools()
    }
    //view.webContents.openDevTools()
    //admin.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null
    })
    //child.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
    //  child = null
  //  })
    require('./mainmenu')
    ipcMain.on('admin-child', function(event, arg){
      //view = BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: true, webviewTag: true}})
        //view.show();
        win.setBrowserView(admin)
        admin.webContents.loadURL(arg);
    })
    ipcMain.on('adminURL-child', function(event, arg){
      //view = BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: true, webviewTag: true}})
        //view.show();
        win.setBrowserView(adminURL)
        adminURL.webContents.loadURL(arg);
    })
    ipcMain.on('help-child', function(event, arg){
      //view = BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: true, webviewTag: true}})
        //view.show();
        win.setBrowserView(help)
    })
    ipcMain.on('show-child', function(event, arg){
      //view = BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: true, webviewTag: true}})
        //view.show();
        win.setBrowserView(view)
        view.webContents.loadURL(arg);
    })
    ipcMain.on('show-child2', function(event, arg){
      //view = BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: true, webviewTag: true}})
        //view.show();
        win.setBrowserView(view2)
        view2.webContents.loadURL(arg);
    })
    ipcMain.on('show-child3', function(event, arg){
      //view = BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: true, webviewTag: true}})
        //view.show();
        win.setBrowserView(view3)
        view3.webContents.loadURL(arg);
    })
    ipcMain.on('show-child4', function(event, arg){
      //view = BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: true, webviewTag: true}})
        //view.show();
        win.setBrowserView(view4)
        view4.webContents.loadURL(arg);
    })
    ipcMain.on('w1', function(event, arg){
      //view = BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: true, webviewTag: true}})
        //view.show();
        win.setBrowserView(view)
    })
    ipcMain.on('w2', function(event, arg){
      //view = BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: true, webviewTag: true}})
        //view.show();
        win.setBrowserView(view2)
    })
    ipcMain.on('w3', function(event, arg){
      //view = BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: true, webviewTag: true}})
        //view.show();
        win.setBrowserView(view3)
    })
    ipcMain.on('w4', function(event, arg){
      //view = BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: true, webviewTag: true}})
        //view.show();
        win.setBrowserView(view4)
    })
    ipcMain.on('show-url', function(event, arg){
      //view = BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: true, webviewTag: true}})
        win.setBrowserView(webv)
        webv.webContents.loadURL(arg);
    })
    ipcMain.on('show-url2', function(event, arg){
      //view = BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: true, webviewTag: true}})
        win.setBrowserView(webv2)
        webv2.webContents.loadURL(arg);
    })
    ipcMain.on('show-url3', function(event, arg){
      //view = BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: true, webviewTag: true}})
        win.setBrowserView(webv3)
        webv3.webContents.loadURL(arg);
    })
    ipcMain.on('show-url4', function(event, arg){
      //view = BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: true, webviewTag: true}})
        win.setBrowserView(webv4)
        webv4.webContents.loadURL(arg);
    })
    ipcMain.on('wifi-url', function(event, arg){
      //view = BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: true, webviewTag: true}})
        win.setBrowserView(webv)
    })
    ipcMain.on('wifi-url2', function(event, arg){
      //view = BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: true, webviewTag: true}})
        win.setBrowserView(webv2)
    })
    ipcMain.on('wifi-url3', function(event, arg){
      //view = BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: true, webviewTag: true}})
        win.setBrowserView(webv3)
    })
    ipcMain.on('wifi-url4', function(event, arg){
      //view = BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: true, webviewTag: true}})
        win.setBrowserView(webv4)
    })
  }


  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow)

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow()
    }
  })
  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.
