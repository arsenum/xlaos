// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0;

contract XlaOracle{
    uint private _lastUSDPrice = 1000000000000000000; //18 decimal places

    function getLastUSDPrice() public view returns(uint256){
        return _lastUSDPrice;
    }
}
//todo get XLA USD price from uniswap
//https://docs.uniswap.org/protocol/reference/deployments