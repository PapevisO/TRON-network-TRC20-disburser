const { BigNumber } = require('@ethersproject/bignumber')
const path = require('path')
const fs = require('fs')

const directoryPath = path.join(__dirname, '../disburse.json')
const data = JSON.parse(fs.readFileSync(directoryPath, 'utf8'))

const totalNormalizedAmount = data.reduce((total, record) => {
  if (record.currency !== 'USDT') {
    throw new Error('Currency/Token not supported:', record.currency)
  }

  return total + record.normalizedAmount * 1e6
}, 0)

const disburseRecords = data.map(record => {
  let recipient = record.recipient
  if (!record.recipient.match(/T[A-Za-z1-9]{33}/)) {
    throw new Error('Address invalid:', recipient)
  }

  let normalizedAmount = BigNumber.from(record.amount * 1e6).toHexString()

  return({
    recipientAddress: recipient,
    normalizedAmount: normalizedAmount,
    humanizedAmount: record.amount
  })
})

module.exports = { disburseRecords, totalNormalizedAmount }
