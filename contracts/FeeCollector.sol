//pragma solidity >=0.4.21 <0.6.0;
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0;
//import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "./XOLA.sol";
import "./ERC20XLA.sol";
import "./StakeSplitter.sol";
import "./Oracle.sol";
contract FeeCollector  {
    address public owner;
    uint256 public balance;
    address public XOLA_addr;
    address public XLA_addr;
    XOLA private xola_token;
    XLA private xla_token;
    uint256 public xolaBalance;
    uint256 private _totalTransfer;
    uint256 private _vestingReward;
    uint256 private _vestingRewardUnlocked;

    mapping (address => mapping(address => Transaction)) public ordersPaid;
    mapping (address => uint256) internal escrow;


    struct Transaction {
        address buyer;
        uint256 amount;
        address orderId;
    }


    event TransferReceived(address _from, uint _amount);
    event TransferSent(address _from, address _destAddr, uint _amount);

    constructor() {
        owner = msg.sender;
    }

    receive() payable external {
        balance += msg.value;
        emit TransferReceived(msg.sender, msg.value);
    }

    function withdraw(uint amount, address payable destAddr) public {
        // require(msg.sender == owner, "Only owner can withdraw funds");
        // require(amount <= balance, "Insufficient funds");

        destAddr.transfer(amount);
        balance -= amount;
        emit TransferSent(msg.sender, destAddr, amount);
    }

    function transferERC20(IERC20 token, address to, uint256 amount) public {
       //require(msg.sender == owner, "Only owner can withdraw funds");
        //uint256 erc20balance = token.balanceOf(address(this));
        //require(amount <= erc20balance, "balance is low");
        token.transfer(to, amount);
        emit TransferSent(msg.sender, to, amount);
    }
    function setSmartContractAllownace(IERC20 token) public view {
        token.allowance(msg.sender,address(this));
    }
    function lock(IERC20 token, uint256 amount) public payable{
       //require(msg.sender == owner, "Only owner can withdraw funds");
        //uint256 erc20balance = token.balanceOf(address(this));
        //require(amount <= erc20balance, "balance is low");
        address to = address(this);
        // token.allowance(msg.sender,to);//,amount);
        // token.approve(msg.sender,amount);
        //token.increaseAllowance(msg.sender, amount);
        token.transferFrom(msg.sender,to, amount);
        //escrow[msg.sender] += amount;
        escrow[msg.sender] += amount;
       // escrow[msg.sender].holderAddress = msg.sender;
        xolaBalance += amount;
        //airdroppedTokens[msg.sender].tokenOwner += amount;
        //emit TransferSent(msg.sender, to, amount);
    }
    function unlock(ERC20 token, address payable destAddr,uint256 amount) public payable{
       //require(msg.sender == owner, "Only owner can withdraw funds");
        //uint256 erc20balance = token.balanceOf(address(this));
        //require(amount <= erc20balance, "balance is low");
        //address to = msg.sender;//address(this);
        //address payable p = msg.sender;
        //destAddr.transfer(amount);

        token.allowance(msg.sender,address(this));
        token.allowance(address(this),msg.sender);
        token.increaseAllowance(msg.sender, amount);
        token.increaseAllowance(address(this), amount);
        token.transferFrom(address(this),msg.sender, escrow[msg.sender]);
        escrow[msg.sender] -= amount;
        //escrow[msg.sender].address = msg.sender;
        xolaBalance -= amount;
        //token.safeTransfer(destAddr,amount);
        //emit TransferSent(address(this), msg.sender, amount);
    }
    //function claim(ERC20 token, address payable destAddr,uint256 amount) public payable{
    function claim(uint256 amount) public payable{
        XLA token = XLA(this.XLA_addr());
        token.allowance(msg.sender,address(this));
        token.allowance(address(this),msg.sender);
        token.increaseAllowance(msg.sender, amount);
        token.increaseAllowance(address(this), amount);
        token.transferFrom(address(this),msg.sender, amount);
    }
    function BalnceERC20(IERC20 token) public view returns(uint256) {
        require(msg.sender == owner, "Only owner can withdraw funds");
        uint256 erc20balance = token.balanceOf(address(this));
        return erc20balance;
        // require(amount <= erc20balance, "balance is low");
        // token.transfer(to, amount);
        // emit TransferSent(msg.sender, to, amount);
    }
    function SetTokens(address xola, address xla) public {
        XOLA_addr = xola;
        XLA_addr = xla;
    }
    function SetToken(address _xola, address _xla) public {
        xola_token = XOLA(_xola);
        xla_token =  XLA(_xla);
    }
    function Init(ERC20 xola,ERC20 xla) public {
        uint256 amount  = 5555;
        //xola.increaseAllowance(msg.sender, amount);
        xola.increaseAllowance(address(this), amount);
        //xla.increaseAllowance(msg.sender, amount);
        xla.increaseAllowance(address(this), amount);
        //xla.allowance(address(this), 6666);
        xla.allowance(msg.sender, address(this));
        xla.allowance( address(this),msg.sender);


        xola.transfer(address(this),360000000000000000000000000);

        //emit Approval(msg.sender, address(this), amount);
    }
    function queueOrder() public{
        //set order as pending

    }
    function buy(ERC20 token, uint256 amount, address order, address smartContract) public payable{
        //check
        //set order as paid
        //use smartContract to split payments to stake holders
        // token.allowance(msg.sender,address(this));
        // token.allowance(address(this),msg.sender);
        // token.increaseAllowance(msg.sender, amount);
        // token.increaseAllowance(address(this), amount);
        uint256 fee = (amount/20);
        address to = address(this);
        //ordersPaid[msg.sender][order].buyer=true;
        ordersPaid[msg.sender][order].amount=amount;
        ordersPaid[msg.sender][order].orderId=order;
        token.allowance(address(this),msg.sender);
        token.transferFrom(msg.sender,to, fee);
        token.transferFrom(msg.sender,smartContract, (amount-fee));
        StakeSplitter ss = StakeSplitter(smartContract);
        ss.splitPay();


        // for (uint i =0; i<escrow.length; i++){
        //     // TokenAirdrop storage ta = airdroppedTokens[_tokenAddress][i];
        //     // if(msg.sender == ta.tokenOwner &&
        //     //     airdropHasExpired(_tokenAddress,i)){

        //     //     tokensToReturn = tokensToReturn.add(ta.tokenBalance);
        //     //     ta.tokenBalance = 0;
        //     // }
        // }
        //xolaBalance escrow[msg.sender]


        //ERC20(XLA).transferFrom(msg.sender,smartContract, (amount-fee));
    }

}
