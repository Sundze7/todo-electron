const electron = require("electron");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
app.on("ready", () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/main.html`);

  const mainManu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainManu);
});

const menuTemplate = [
  // represent menu property
  {
    label: "File",
    submenu: [
      { label: "New Todo" },
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
