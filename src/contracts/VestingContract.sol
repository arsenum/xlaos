// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
//import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/token/ERC20/ERC20.sol";
import "./ERC20XOLA.sol";
import "./ERC20XLA.sol";
/**
 * @title XOLA Vesting
 * @dev Implements voting process along with vote delegation
 */
contract XOLAVesting {
    struct Transaction {
        address buyer;
        uint256 amount;
        bool locked;
        bool spent;
    }
    address constant xolaAddress = 0xf8e81D47203A594245E36C48e151709F0C19fBe8;
    address constant xlaAddress = 0xf8e81D47203A594245E36C48e151709F0C19fBe8;
    //mapping(uint256 => mapping(address => uint256)) balances;
    mapping(address => mapping(address => Transaction)) public balances;


    //   modifier onlyAdmin {
    //     require(msg.sender == admin, "Only admin can unlock escrow.");
    //     _;
    //   }

    // constructor() {
    //     admin = msg.sender;
    // }

    // seller accepts a trade, erc20 tokens
    // get moved to the escrow (this contract)
    function accept(
        address _tx_id,
        address _buyer,
        uint256 _amount
    ) external returns (uint256) {
        XOLA token = XOLA(p2pmAddress);
        token.transferFrom(msg.sender, address(this), _amount);
        totalBalance += _amount;
        balances[msg.sender][_tx_id].amount = _amount;
        balances[msg.sender][_tx_id].buyer = _buyer;
        balances[msg.sender][_tx_id].locked = true;
        balances[msg.sender][_tx_id].spent = false;
        return token.balanceOf(msg.sender);
    }

    // retrieve current state of transaction in escrow
    function transaction(address _seller, address _tx_id)
        external
        view
        returns (
            uint256,
            bool,
            address
        )
    {
        return (
            balances[_seller][_tx_id].amount,
            balances[_seller][_tx_id].locked,
            balances[_seller][_tx_id].buyer
        );
    }

    // admin unlocks tokens in escrow for a transaction
    function release(address _tx_id, address _seller)
        external
        
        returns (bool)
    {
        balances[_seller][_tx_id].locked = false;
        return true;
    }

    // seller is able to withdraw unlocked tokens
    function withdraw(address _tx_id) external returns (bool) {
        require(
            balances[msg.sender][_tx_id].locked == false,
            "This escrow is still locked"
        );
        require(
            balances[msg.sender][_tx_id].spent == false,
            "Already withdrawn"
        );

        XOLA token = XOLA(xlaAddress);
        token.transfer(msg.sender, balances[msg.sender][_tx_id].amount);

        totalBalance -= balances[msg.sender][_tx_id].amount;
        balances[msg.sender][_tx_id].spent = true;
        return true;
    }


    // admin can send funds to buyer if dispute resolution is in buyer's favor
      function resolveToBuyer(address _seller, address _tx_id) onlyAdmin external returns(bool) {
        XLA token = XLA(xlaAddress);
        token.transfer(balances[_seller][_tx_id].buyer, balances[msg.sender][_tx_id].amount);

        balances[_seller][_tx_id].spent = true;
        totalBalance -= balances[_seller][_tx_id].amount;
        return true;
      }
      
    // constructor() ERC20("XO.LA Vesting", "XOLAVesting") {
    //     _mint(msg.sender, 36000000000 * 18**decimals());
    // }
    function sendVested() public {}

    function lock(
        //    address sc,
        uint256 id,
        uint256 tokens
    ) public {
        // add the deposited tokens into existing balance
        // balances[id][msg.sender] += tokens;
        // transfer the tokens from the sender to this contract
        //IERC20(sc).transferFrom(msg.sender, address(this), tokens);
    }

    // function unlock(
    //    // address sc,
    //     uint256 id,
    //     uint256 tokens
    // ) public {
    //     require(tokens <= balances[id][msg.sender]);
    //     uint256 ret = balances[id][msg.sender];

    //     balances[id][msg.sender] = ret - tokens;
    //     //IERC20(sc).transfer(msg.sender, ret);
    // }

    // function balance(uint256 id) public view returns (uint256) {
    //     return balances[id][msg.sender];
    // }

    //define logic for each ERA

    function Claim() public {
        //define logic for burning XO.LA
        //define logic for
    }

    function CheckAvailableClaim() external view returns (uint256) {
        XOLA xola = XOLA(xolaAddress);
        address c = address(this);
        return xola.balanceOf(c);
    }

    // function Lock() public {}

    // function UnLock() public {}
}
