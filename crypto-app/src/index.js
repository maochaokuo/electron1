const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const axios = require('axios');
const ipc = electron.ipcRenderer

const notifyBtn = document.getElementById('notifyBtn')
// Const's removed for brevity

var price = document.querySelector('h1')
var targetPrice = document.getElementById('targetPrice')
var targetPriceVal;

const notification = {
  title: 'BTC Alert',
  body: 'BTC just beat your target price!',
  icon: path.join(__dirname, '../assets/images/btc.png')
}
function getBTC() {
  axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
  .then(res => {
      const cryptos = res.data.BTC.USD
      price.innerHTML = '$'+cryptos.toLocaleString('en')

      // Add this:
      console.log('targetPrice.innerHTML='+targetPrice.innerHTML)
      console.log('targetPriceVal='+targetPriceVal)
      console.log('res.data.BTC.USD='+res.data.BTC.USD)
      if (targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.USD) {
        console.log(notification.title)
        console.log(notification)
          const myNotification = new window.Notification(notification.title, notification)
      }

  })
}

getBTC();
setInterval ( getBTC, 1000 );
// Other code from the course removed for brevity

notifyBtn.addEventListener('click', function (event) {
    const modalPath = path.join('file://', __dirname, 'add.html')
    let win = new BrowserWindow({ frame: false, transparent: true, alwaysOnTop: true, width: 400, height: 200 })
    win.on('close', function () { win = null })
    win.loadURL(modalPath)
    win.show()
  })
  ipc.on('targetPriceVal', function(event, arg){
    targetPriceVal = Number(arg)
    console.log('targetPriceVal='+targetPriceVal)
    targetPrice.innerHTML='$'+targetPriceVal.toLocaleString('en')
  })
  