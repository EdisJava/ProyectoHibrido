//codigo minimo de prueba de elctron 

const { app, BrowserWindow } = require("electron");

const port = process.argv[2] || 19006;
const EXPO_URL = `http://localhost:${port}`;

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadURL(EXPO_URL);
}

app.whenReady().then(() => {
  createWindow(); // ✔ solo una vez
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
