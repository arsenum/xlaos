
##Introduction
This is a proof of concept wallet designed to work with EVMOS. It's intended for testing purposes only.
##OSX Setup Instructions
Download Binary from 
```
https://github.com/tharsis/evmos/releases/tag/v0.1.3
```
Extract and move evmosd to your bin folder
```
mv evmosd /usr/local/bin  
```
Give setup script permission to execute
```
chmod +x ./init.sh 
```
Run setup script (this also resets and launches the EVM)
```
sudo init.sh
```
To restart the EVM after stopping it use
```
evmosd
```

Development Prerequisites: Node, NPM
Install Ionic Framework
```
npm install -g @ionic/cli
```
Clone this repository
```
git clone https://github.com/arsen3d/EVMOSWallet.git
cd EVMOSWallet
```
Serve wallet
```
ionic s
```

See further setup instructions on Welcome Screen

After you have imported your account in to Metamask, use https://remix.ethereum.org/ to deploy your ERC20 contract to the EVM, which is found in 
```
/src/contracts/ERC20Token.sol
```
The resulting screen will have the ERC20 Contract Address, which is needed to added as assett in Metamask and hardcoded in Wallet.tsx
Example:
```
const contract = new web3.eth.Contract(
      abi as any,
      "0x9d626f94b572a9Af414E9fd0f43a1Dd7b375FfB6"
    );
```
###TODO
* Implment reading ERC20 transfer amount.
* Implment Indexing Server to get all transaction assosiated with wallet
* Stylize wallet so that the design is beautiful
* Implement dynamically updating wallet Hex address when Bech32 address changes and in reverse
* Implement reload button
* Implement formatting of balances based on decimal places
* Add ability to add ERC20 and ERC721 Assets dynamically via UI
* Add ability to render ERC721 Assets as images, audio, video

### Technical and design decisions
I implemented everything on the client. For the wallet to work properly and efficiently a Transaction Indexing Server is needed. Since this was intended as a proof of concept, I felt it was fine to do this without having a server component in place.

### Challanges
I had to get transactions associated with an account from logs. While it works for testing purposes, it is slow and there is a limit how many blocks can be scanned to find transactions. I looked through documentation and stackoverflow to find a fast and simple solution that can be implemeted on the client, but was unable to find it. I've reached a conclussion that this is normally done on Transaction Indexing Server and accessed via API.

Displaying ERC20 transaction transfer amount is available through a accessing transaction parameter list. I was looking for a cleaner way to get it, but did not find it web3 or ethers libraries.



### Technical References
https://web3js.readthedocs.io/en/v1.5.2/web3-eth.html
https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/token/ERC20/ERC20.sol
https://github.com/cosmos/cosmjs/tree/main/packages/crypto
