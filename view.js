let $ = require('jquery')
let { ipcRenderer } = require('electron')

$('#load-ips').on('click', () => {
  console.log('clicked')
  ipcRenderer.send('ips', 'searchIps')
})

ipcRenderer.on('ips', (event, arg) => {
  setTable(arg)
})

setTable = (ipArr) => {
  let list = ipArr.map((ip) => {
    return `<p>${ip}</p>`
  });

  $('#ips').html(list)
}