// Contingut obligatori per a: electron/main.cjs
// (Utilitza 'require' perquè és un arxiu .cjs)

const { app, BrowserWindow } = require('electron');
const path = require('path');

// Variable global per evitar que el 'garbage collector' tanqui la finestra
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      // (No fem servir 'preload' de moment per simplicitat)
    },
  });

  // Aquesta és la part clau que connecta amb Vite:
  // Si estem en desenvolupament (npm run dev), carrega el servidor de Vite
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    // Obre les eines de desenvolupador (opcional)
    mainWindow.webContents.openDevTools();
  } else {
    // Si estem en producció (app empaquetada), carrega l'arxiu index.html
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Quan Electron està llest, crea la finestra
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Tanca l'app quan totes les finestres es tanquen (excepte a macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});