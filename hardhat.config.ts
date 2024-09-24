import { HardhatUserConfig } from 'hardhat/types'
// import { HardhatUserConfig } from 'hardhat/config'

import '@typechain/hardhat'
import '@typechain/ethers-v5'
// import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-solhint'
import 'hardhat-deploy'
// import 'hardhat-deploy-ethers'
import 'hardhat-gas-reporter'
import 'solidity-coverage'
import '@primitivefi/hardhat-dodoc'
// Uninstalled and replaced with @nomiclabs/hardhat-verify
// import '@nomiclabs/hardhat-etherscan'
import '@nomicfoundation/hardhat-verify'

import 'tsconfig-paths/register'

// Imports ZKsync plugins
import '@matterlabs/hardhat-zksync-deploy'
import '@matterlabs/hardhat-zksync-solc'
import '@matterlabs/hardhat-zksync-ethers'
import '@matterlabs/hardhat-zksync-node'
import '@matterlabs/hardhat-zksync-verify'

// import tasks
import 'tasks/reset'
import 'tasks/createSplit'
import 'tasks/seedAccount'
import 'tasks/estimateGas'

import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const config: HardhatUserConfig = {
  // solidity: '0.8.4',
  solidity: {
    compilers: [
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
            // runs: 999999,
          },
        },
      },
      {
        version: '0.5.17',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  // typechain: {
  //   outDir: 'src/types',
  //   target: 'ethers-v5',
  // },
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    zkSyncSepoliaTestnet: {
      url: 'https://sepolia.era.zksync.dev',
      // @ts-ignore
      ethNetwork: 'sepolia',
      // @ts-ignore
      zksync: true,
      // @ts-ignore
      verifyURL:
        'https://explorer.sepolia.era.zksync.dev/contract_verification',
      accounts: process.env.DEPLOYER_PRIVATE_KEY
        ? [`0x${process.env.DEPLOYER_PRIVATE_KEY}`]
        : 'remote',
    },
    inMemoryNode: {
      url: 'http://127.0.0.1:8011',
      // @ts-ignore
      ethNetwork: 'localhost',
      // @ts-ignore
      zksync: true,
      accounts: [
        '0x3d3cbc973389cb26f657686445bcc75662b415b656078503592ac8c1abb8810e',
      ],
    },
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: process.env.DEPLOYER_PRIVATE_KEY
        ? [`0x${process.env.DEPLOYER_PRIVATE_KEY}`]
        : 'remote',
    },
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: process.env.DEPLOYER_PRIVATE_KEY
        ? [`0x${process.env.DEPLOYER_PRIVATE_KEY}`]
        : 'remote',
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: process.env.DEPLOYER_PRIVATE_KEY
        ? [`0x${process.env.DEPLOYER_PRIVATE_KEY}`]
        : 'remote',
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: process.env.DEPLOYER_PRIVATE_KEY
        ? [`0x${process.env.DEPLOYER_PRIVATE_KEY}`]
        : 'remote',
    },
    kovan: {
      url: `https://eth-kovan.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: process.env.DEPLOYER_PRIVATE_KEY
        ? [`0x${process.env.DEPLOYER_PRIVATE_KEY}`]
        : 'remote',
    },
    hardhat: {
      // @ts-ignore
      zksync: true,
      forking: {
        // url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`, // for ETH mainnet
        // blockNumber: 13852105, // for ETH mainnet
        url: `https://zksync-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`, // for ZKsync mainnet
        blockNumber: 44906562,
      },
      chainId: 1337,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
  },
  mocha: {
    timeout: 50000,
  },
  dodoc: {
    exclude: ['Clones', 'ReverseRecords', 'SafeTransferLib', 'ERC20'],
  },
}

export default config
