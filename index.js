const { app, BrowserWindow } = require("electron")
const path = require("path")

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "app", "preload.js")
        }
    })
    win.loadFile(path.join(__dirname, "app", "index.html"));
}

app.whenReady().then(() => {
    createWindow()

    app.on("activate", function() {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    app.on("window-all-closed", function() {
        if (process.platform !== "darwin") {
            app.quit();
        }
    });
})