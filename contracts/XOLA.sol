// SPDX-License-Identifier: GPL-3.0
//pragma solidity >=0.4.21 <0.6.0;
pragma solidity >=0.5.0;
//import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20.sol";
//import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
contract XOLA is ERC20 {
    constructor() ERC20("XO.LA", "XOLA") {
        _mint(msg.sender, 36000000000 * 18**decimals());
    }

    
}
