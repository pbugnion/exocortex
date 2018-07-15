
const {app, BrowserWindow} = require('electron')

let window
  
function createWindow () {
    // Create the browser window.
    window = new BrowserWindow({width: 800, height: 600})

    window.loadURL(`file://${__dirname}/app.html`);

    window.openDevTools()

    window.on('closed', () => window = null)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
	app.quit()
    }
})

app.on('activate', () => {
    if (window == null) {
	createWindow()
    }
})
