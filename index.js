const electron = require("electron");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let addWindow;
app.on("ready", () => {
  mainWindow = new BrowserWindow({});
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
  });
  addWindow.loadURL(`file://${__dirname}/add.html`);
}

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
