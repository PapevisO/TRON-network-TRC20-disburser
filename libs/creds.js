const path = require('path')
const fs = require('fs')

const directoryPath = path.join(__dirname, '../key.json')
const data = fs.readFileSync(directoryPath, 'utf8')
const jsonData = JSON.parse(data)

module.exports = {
  WALLET_PRIVATE_KEY: jsonData.privateKey,
  WALLET_ADDRESS: jsonData.address.base58
}
