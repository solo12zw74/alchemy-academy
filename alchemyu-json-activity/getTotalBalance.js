require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const url = `https://eth-mainnet.g.alchemy.com/v2/${API_KEY}`;

async function getTotalBalance(addresses) {
    const batch =
        addresses.map(function (value, index) {
            return {
                jsonrpc: "2.0",
                id: index,
                method: "eth_getBalance",
                params: [value, "latest"]
            }
        });

    const response = await axios.post(url, batch);

    // use this if you want to inspect the response data!
    console.log(response.data);

    return response.data.reduce((acc, element) => acc + Number(element.result), 0)
}

module.exports = getTotalBalance;