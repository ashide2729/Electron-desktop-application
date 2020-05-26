const electron = require("electron");
const url = require("url");
const path = require("path");

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let addWindow;

app.on('ready', function(){
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes:true
  }));
  mainWindow.on('closed', function(){
    app.quit();
  });

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

function createAddWindow(){
  addWindow = new BrowserWindow({
    width: 400,
    height:300,
    title:'Add List Item'
  });
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'addItemWindow.html'),
    protocol: 'file:',
    slashes:true
  }));
  addWindow.on('close', function(){
    addWindow = null;
  });
}

const mainMenuTemplate =  [
  {
    label: 'File',
    submenu:[
      {
        label:'Add Item',
        click(){
          createAddWindow();
        }
      },
      {
        label:'Delete Items',
        click(){
          mainWindow.webContents.send('item:clear');
        }
      },
      {
        label: 'Exit',
        accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  }
];