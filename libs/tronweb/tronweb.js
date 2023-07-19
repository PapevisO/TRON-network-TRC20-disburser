// https://developers.tron.network/reference/tronweb-object
const TronWeb = require('tronweb')
const { WALLET_PRIVATE_KEY } = require('../creds')

let tronWeb

async function init() {
  if (!tronWeb) {
    const HttpProvider = TronWeb.providers.HttpProvider
    const fullNode = new HttpProvider("https://api.trongrid.io")
    const solidityNode = new HttpProvider("https://api.trongrid.io")
    const eventServer = new HttpProvider("https://api.trongrid.io")
    // Set if and when relevant
    // tronWeb.setHeader({"TRON-PRO-API-KEY": 'your api key'})

    tronWeb = new TronWeb(fullNode, solidityNode, eventServer, WALLET_PRIVATE_KEY)
  }

  return tronWeb
}

async function triggerContract(contractAddress, cb, ...args) {
  let tronWeb = await init()
  let contract = await tronWeb.contract().at(contractAddress)

  try {
    console.info('Triggering contract method', cb)
    if (cb === 'transfer') {
      return await contract[cb](...args).send()
    } else {
      return await contract[cb](...args).call()
    }
  } catch (err) {
    console.error('Failed contract call', cb, 'with args', args)

    throw err
  }
}

module.exports = { triggerContract }
