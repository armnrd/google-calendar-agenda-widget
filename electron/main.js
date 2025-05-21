const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
    // Create the browser window with frame: false for borderless
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        frame: false, // This removes the window border/frame
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // Load the Next.js app
    const startUrl = isDev
        ? 'http://localhost:3000' // Development server
        : `file://${path.join(__dirname, '../build/index.html')}`; // Production build

    mainWindow.loadURL(startUrl);

    // Open DevTools in development mode
    if (isDev) {
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    }

    // Handle window closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Create window when Electron is ready
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// On macOS, re-create window when dock icon is clicked
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Handle window controls (minimize, maximize, close)
ipcMain.on('minimize-window', () => {
    if (mainWindow) mainWindow.minimize();
});

ipcMain.on('maximize-window', () => {
    if (mainWindow) {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
    }
});

ipcMain.on('close-window', () => {
    if (mainWindow) mainWindow.close();
});

// In main.js, add a protocol handler for serving local resources
const { protocol } = require('electron');

app.whenReady().then(() => {
    protocol.registerFileProtocol('app', (request, callback) => {
        const url = request.url.substring(6); // Remove 'app://'
        callback({ path: path.join(__dirname, url) });
    });

    createWindow();
});

// Then in your HTML/CSS, use app:// protocol
// background-image: url('app://assets/image.png');