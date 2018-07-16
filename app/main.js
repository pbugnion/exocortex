
const {app, BrowserWindow} = require('electron')

let window

function installExtensions() {

    const installExtension = require('electron-devtools-installer').default
    const { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer')

    const promises = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].map(
	extension =>
	    installExtension(extension)
	    .then(name => console.log(`Added Extension:  ${name}`))
	    .catch(err => console.log(`An error occurred installing extension ${extension}: `, err))
    )
    return Promise.all(promises)
}
  
function createWindow () {
    // Create the browser window.
    installExtensions().then(() => {
	window = new BrowserWindow({width: 800, height: 600})

	window.loadURL(`file://${__dirname}/app.html`);

	window.openDevTools()

	window.on('closed', () => window = null)
    });
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
