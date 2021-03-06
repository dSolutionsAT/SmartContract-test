/*
 *
 *
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

const providerWithMnemonic = (mnemonic, rpcEndpoint) =>
new HDWalletProvider(mnemonic, rpcEndpoint);
require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');


const infuraProvider = network => providerWithMnemonic(
  process.env.MNEMONIC || '',
  `https://${network}.infura.io/${process.env.INFURA_API_KEY}`
);

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development:{
host: 'localhost',
   port: 8545,
   network_id: '*'
    },
  kovan: {
    provider: infuraProvider('kovan'),
    network_id: '42',
    GasPrice: 100000000

  }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200

    }
  }

  
};
