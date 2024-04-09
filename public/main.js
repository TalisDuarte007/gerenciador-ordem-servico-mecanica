const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    // app.on('ready', () => {
    //     const mainWindow = new BrowserWindow({
    //         webPreferences: {
    //             nodeIntegration: false, // Defina como false
    //             // ... outras opções ...
    //         },
    //     });
    
    //     // Carregue o arquivo local index.html
    //     mainWindow.loadURL(url.format({
    //         pathname: path.join(__dirname, 'index.html'),
    //         protocol: 'file:',
    //         slashes: true,
    //     }));
    // });

    mainWindow.loadURL("https://gerenciador-ordem-servico-mecanica.vercel.app/")
    

    // mainWindow.loadURL(
    //     url.format({
    //         pathname: path.join(__dirname, 'index.html'),
    //         protocol: 'file:',
    //         slashes: true,
    //     })
    // );    

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
