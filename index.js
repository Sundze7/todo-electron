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
