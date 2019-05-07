const {app, BrowserView, BrowserWindow} = require('electron')
const {ipcMain} = require('electron')
const electron = require('electron')

  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let win

  function createWindow () {
    const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
    // Create the browser window.
    win = new BrowserWindow({width: 375, height: 667, frame: false, backgroundColor: '#2e2c29', kiosk: false, webPreferences: {
    nodeIntegration: true
  }})
    //let child = new BrowserWindow({ parent: win, modal: false, show: false, width: 800, height: 600, webPreferences: {nodeIntegration: true}})
  let view = new BrowserView({backgroundColor: '#2e2c29', webPreferences: {nodeIntegration: true, webviewTag: true}})
win.setBrowserView(view)
wstart = width*0.04;
//hstart = height*0.9;
view.setBounds({ x: 0, y: wstart, width: 375, height: 667 })
view.webContents.loadURL('file://' + __dirname + '/browser.html')

//view.loadFile('browser.html')
    // and load the index.html of the app.
    win.loadFile('index.html')
    //child.loadFile('browser.html')


    // Open the DevTools.
    //win.webContents.openDevTools()
    //view.webContents.openDevTools()


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
    ipcMain.on('show-child', function(event, arg){
        view.webContents.loadURL(arg);
        //child.show();
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
