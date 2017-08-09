const { app, BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')
const { ipcMain } = require('electron')

let win

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
}

ipcMain.on('ips', (event, arg) => {
  const ping = require('ping')
  const base = '192.168.0.'
  let ips = []

  for (i = 0; i < 256; i++) {
    ips.push(base + i)
  }

  let aliveIps = []

  let promises = ips.map((ip) => {
    return ping.promise.probe(ip)
      .then((res) => {
        if (res.alive) {
          aliveIps.push(res.host)
        }
      })
  })

  Promise.all(promises).then(() => {
    console.log(aliveIps.sort())
    event.sender.send('ips', aliveIps.sort())
  }).catch((err) => {
    console.log(err)
  })
})


app.on('ready', createWindow)