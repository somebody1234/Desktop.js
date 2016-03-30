var electron = require('electron'),
	BrowserWindow = electron.BrowserWindow,
	app = electron.app,
	ipc = electron.ipcMain,
	Menu = electron.Menu,
	fs = require('fs'),
	path = require('path'),
	os = require('os'),
	main,
	windows = [],
	CONFIG,
	app_path,
	package
ipc.on('name', (e, args) => {})
app.on('ready', function() {
	main = new BrowserWindow({
		title: 'AvocadOS Desktop',
		fullscreen: true,
		frame: false,
		alwaysOnTop: true
	})
	main.loadURL('file://' + path.resolve(__dirname, 'desktop.html'))
	main.on('closed', app.quit)
})