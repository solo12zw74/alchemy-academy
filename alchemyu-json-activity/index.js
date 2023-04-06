const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const ALCHEMY_URL = `https://eth-mainnet.g.alchemy.com/v2/${API_KEY}`

axios.post(ALCHEMY_URL, {
  jsonrpc: "2.0",
  id: 1,
  method: "eth_getBlockByNumber",
  params: [
    "0xb443", // block 46147
    false  // retrieve the full transaction object in transactions array
  ]
}).then((response) => {
  console.log(response.data.result);
});