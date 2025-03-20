const electron = require("electron");

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true, // <--- This enables `require`
      contextIsolation: false, // <--- Also required for `nodeIntegration` to work
    },
  });
  mainWindow.loadURL(`file://${__dirname}/main.html`);
  mainWindow.on("closed", () => {
    app.quit();
  });

  const mainManu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainManu);
});

function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: "Add New Todo",
    webPreferences: {
      nodeIntegration: true, // <--- This enables `require`
      contextIsolation: false, // <--- Also required for `nodeIntegration` to work
    },
  });
  addWindow.loadURL(`file://${__dirname}/add.html`);
  // whenever addWindow is closed, point it to null, reclaiming memory it used (garbage collection in JS)
  addWindow.on("closed", () => (addWindow = null));
}

ipcMain.on("todo:add", (event, todo) => {
  mainWindow.webContents.send("todo:add", todo);
  addWindow.close();
});

const menuTemplate = [
  // represent menu property
  {
    label: "File",
    submenu: [
      {
        label: "New Todo",
        click() {
          createAddWindow();
        },
      },
      {
        label: "Quit",
        //accelerator: "Ctrl+Q", // allows u add 'Hot-keys' functionality
        // accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q'
        accelerator: (() => {
          if (process.platform === "darwin") {
            return "Command+Q";
          } else {
            return "Ctrl+Q";
          }
        })(),
        click() {
          app.quit();
        },
      },
    ],
  },
];

if (process.platform === "darwin") {
  menuTemplate.unshift({});
}

if (process.env.NODE_ENV !== "production") {
  menuTemplate.push({
    label: "View",
    submenu: [
      {
        label: "Toggle Developer Tools",
        accelerator:
          process.platform === "darwin" ? "Command+Alt+I" : "Ctrl+Shift+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
    ],
  });
}
