const { triggerContract } = require("./tronweb")

// https://tronscan.org/#/contract/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t
const USDT_ADDRESS = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"
const USDT = {
  name: () => triggerContract(USDT_ADDRESS, "name"),
  symbol: () => triggerContract(USDT_ADDRESS, "symbol"),
  totalSupply: () => triggerContract(USDT_ADDRESS, "totalSupply"),
  allowance: () => triggerContract(USDT_ADDRESS, "allowance"),
  balanceOf: (...param) => triggerContract(USDT_ADDRESS, "balanceOf", param[0]),
  currency: () => triggerContract(USDT_ADDRESS, "currency"),
  decimals: () => triggerContract(USDT_ADDRESS, "decimals"),
  owner: () => triggerContract(USDT_ADDRESS, "owner"),
  version: () => triggerContract(USDT_ADDRESS, "version"),
  deprecated: () => triggerContract(USDT_ADDRESS, "deprecated"),
  maximumFee: () => triggerContract(USDT_ADDRESS, "maximumFee"),
  calcfee: () => triggerContract(USDT_ADDRESS, "calcfee"),
  transfer: (...param) => triggerContract(USDT_ADDRESS, "transfer", param[0], param[1]),
}

module.exports = { USDT }
