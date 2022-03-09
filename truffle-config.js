/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 https://github.com/mikeghen/erc20-truffle-example/blob/master/truffle-config.js
https://github.com/ryvince/Seeds-Grove
https://forum.openzeppelin.com/t/transfer-erc20-on-deploy-truffle-migrate/6378
https://trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript.html
https://ethereum.stackexchange.com/questions/11935/problem-with-truffle-console-cannot-read-property-call-of-undefined
https://trufflesuite.com/docs/truffle/getting-started/interacting-with-your-contracts.html
https://github.com/ethereum-optimism/Truffle-ERC20-Example/blob/master/test/erc20.spec.js
https://trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
https://github.com/truffle-box/metacoin-box/blob/master/contracts/MetaCoin.sol
https://ethereum.stackexchange.com/questions/113697/how-to-run-a-successful-solidity-smart-contract-test-script
https://trufflesuite.com/docs/truffle/getting-started/using-the-truffle-debugger.html
https://ethereum.stackexchange.com/questions/91609/what-is-the-use-case-of-transferfrom-function-in-erc20-token-contract
https://forum.openzeppelin.com/t/transferfrom-fails-with-error-dai-insufficient-allowance/5940
https://medium.com/codezillas/how-to-develop-erc20-token-using-truffle-6e50703cbe87
https://forum.openzeppelin.com/t/example-on-how-to-use-erc20-token-in-another-contract/1682
https://ethereum.stackexchange.com/questions/46457/send-tokens-using-approve-and-transferfrom-vs-only-transfer
https://forum.openzeppelin.com/t/simple-erc20-crowdsale/4863
https://trufflesuite.com/docs/truffle/reference/configuration#compiler-configuration
https://forum.openzeppelin.com/t/typeerror-cannot-read-property-imports-of-undefined/5813/2
https://docs.openzeppelin.com/cli/2.7/truffle#prerequisites
https://trufflesuite.com/docs/truffle/reference/configuration#compiler-configuration
https://ethereum.stackexchange.com/questions/89524/throw-new-errorcould-not-find-artifacts-for-import-path-from-any-sourc


https://www.statista.com/statistics/763617/venmo-total-payment-volume/#:~:text=Total%20Payment%20Volume%20or%20TPV,processed%20through%20our%20gateway%20products.

truffle migration  --reset option

https://code.visualstudio.com/api/extension-guides/task-provider
https://code.visualstudio.com/docs/editor/tasks

 */

// const HDWalletProvider = require('@truffle/hdwallet-provider');
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  contracts_directory: "./contracts",
  contracts_build_directory: "./build/contracts",
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    // development: {
    //  host: "127.0.0.1",     // Localhost (default: none)
    //  port: 8545,            // Standard Ethereum port (default: none)
    //  network_id: "*",       // Any network (default: none)
    // },
     development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "5777",       // Any network (default: none)
    },
    // Another network with more advanced options...
    // advanced: {
    // port: 8777,             // Custom port
    // network_id: 1342,       // Custom network
    // gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
    // gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
    // from: <address>,        // Account to send txs from (default: accounts[0])
    // websocket: true        // Enable EventEmitter interface for web3 (default: false)
    // },
    // Useful for deploying to a public network.
    // NB: It's important to wrap the provider as a function.
    // ropsten: {
    // provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/YOUR-PROJECT-ID`),
    // network_id: 3,       // Ropsten's id
    // gas: 5500000,        // Ropsten has a lower block limit than mainnet
    // confirmations: 2,    // # of confs to wait between deployments. (default: 0)
    // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    // },
    // Useful for private networks
    // private: {
    // provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
    // network_id: 2111,   // This network is yours, in the cloud.
    // production: true    // Treats this network as if it was a public net. (default: false)
    // }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {

    solc: {
      version: "^0.8.12",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows:
  // $ truffle migrate --reset --compile-all
  //
  // db: {
    // enabled: false,
    // host: "127.0.0.1",
    // adapter: {
    //   name: "sqlite",
    //   settings: {
    //     directory: ".db"
    //   }
    // }
  // }
};
