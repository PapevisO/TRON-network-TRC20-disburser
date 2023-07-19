const TronWeb = require('tronweb')

// Fetch params from https://developers.tron.network/reference#wallet-cli-commands
const fullNode = 'https://api.trongrid.io'
const solidityNode = 'https://api.trongrid.io'
const eventServer = 'https://api.trongrid.io'

// You don't have to provide any specific
// key since your intention is to generate
const privateKey = ''

const tronWeb = new TronWeb(
    fullNode,
    solidityNode,
    eventServer,
    privateKey
)

// Generate new wallet
tronWeb.createAccount().then(account => console.log(account)).catch(err => console.error(err))
