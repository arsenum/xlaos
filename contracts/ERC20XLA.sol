// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0;
//import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/token/ERC20/ERC20.sol";
//import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
contract XLA is ERC20 {
     constructor() ERC20("X.LA", "XLA") {
    _mint(msg.sender, 46000000000 * 10 ** decimals());
    }
    // address payable theReceiverContractAddress;
    //  theReceiverContractAddress = '0x2Dbe8Ed5787176867f85BEC1473c92a6753D15e0'


    // function transfer(address to, uint256 amount) public virtual override returns (bool) {
    //     address owner = _msgSender();
        //split 5% and move to XO.LA
        //Unlock Vesting in XLA baed on multiplyer
    /*this will tranfer the ether stored at this contract's address to the below 
     address */
    //  function debit() external{ theReceiverContractAddress.transfer(value);}
    //     _transfer(owner, to, amount);
    

    //     return true;
    // }
}

