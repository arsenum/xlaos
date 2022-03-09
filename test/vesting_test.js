const Simple = artifacts.require("Simple");
const FeeCollector  = artifacts.require("FeeCollector");
const XOLA  = artifacts.require("XOLA");
const XLA  = artifacts.require("XLA");
//import x from "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 https://ethereum.stackexchange.com/questions/113697/how-to-run-a-successful-solidity-smart-contract-test-script
 */
contract("VestingTest", function (accounts ) {
  it("should assert true", async function () {
    const simple  = await Simple.new();
    await simple.updateData(500);
    var x = await simple.readData();
    console.log(x);
    //await Simple.deployed();
    
    // await VestingTest.deployed();
    // return assert.isTrue(true);
    // const fc = await FeeCollector.deployed().then( async gameInstance => {
    //       console.log("trying transfer")
    //       //tokenInstance.transfer(gameInstance.address, '500000000000000000000000');
    //       // const balance = FeeCollector.BalnceERC20(tokenInstance.address)
    //       // console.log(balance)
    //   });
    const fc = await FeeCollector.deployed()
    console.log("FeeCollector Address", fc.address)
    const xola = await XOLA.deployed()
    const xla = await XLA.deployed()
    await fc.SetTokens(xola.address,xla.address)
    await fc.SetToken(xola.address,xla.address)   
    console.log("Account 0 address",accounts[0])
    console.log("Account 1 address",accounts[1])
    console.log("XOLA Token address:", await fc.XOLA_addr())
    console.log("XLA Token address:", xla.address)
    const cbal = await fc.BalnceERC20(xola.address)
    console.log("Contract Balance:",cbal.toString())
    console.log("Contract Address:", fc.address)
    await xola.transfer(accounts[ 1 ], 10001)
    await xola.transfer(accounts[ 1 ], 10001)
    await xla.transfer(accounts[ 1 ], 500)
    console.log("AC-1 XOLA Initial Balance:", (await xola.balanceOf(accounts[1])).toString())
    await xola.approve(fc.address, await xola.totalSupply(), {from: accounts[1]});
    await xla.approve(fc.address,await xla.totalSupply(), {from: accounts[1]});
    await fc.lock(xola.address, 400, {from: accounts[1]});//, {from: accounts[1]}) //, {from: accounts[0]}
    console.log("AC-1  XOLA Before Lock:", ((await xola.balanceOf(accounts[1])).toString()))
    await fc.unlock(xola.address,accounts[1], 300 , {from: accounts[1]});
    console.log("AC-1  XOLA After Unlock:", ((await xola.balanceOf(accounts[1])).toString()))
    console.log("AC-1 XLA:", ((await xla.balanceOf( accounts[1])).toString()))
    await fc.buy(xla.address,100,fc.address,accounts[2], {from: accounts[1]})
    console.log("AC-1 XLA After Buy:", ((await xla.balanceOf( accounts[1])).toString()))
    console.log("Contract XLA:", ((await xla.balanceOf(fc.address)).toString()))
    console.log("AC-2 XLA:", ((await xla.balanceOf(accounts[2])).toString()))
    await fc.claim(5, {from: accounts[1]})
    console.log("Contract XLA After Claim:", ((await xla.balanceOf(fc.address)).toString()))
    // await fc.claim(xla.address,35,{from: accounts[1]})
    // console.log("Contract XLA After Claim:", ((await xla.balanceOf(fc.address)).toString()))
   //await fc.transferERC20(xola.address, fc.address, 300, {from: accounts[0]})
    // XOLA.deployed().then( async tokenInstance  => {
    // console.log("Token address:", tokenInstance.address)
    //   //fc.transferERC20(tokenInstance, fc.address, 300)
    // const balance =  await tokenInstance.balanceOf.call(accounts[0]);
    //   //const balance = await tokenInstance.getBalance.call(accounts[0]);
    // console.log("Balance:", balance.toString())
    //   //deployer.deploy(FeeCollector, tokenInstance.address); // constructor takes the token contract's address as a param
    //   //const dep = await FeeCollector.deployed()
    //   //console.log("FeeCollector deployed:",dep.address)
      
  //});
    //const fc = FeeCollector.new();
    




    // await xla.approve(accounts[1],3333);
    // await xla.approve(accounts[0],3333);
    //await fc.setSmartContractAllownace(xola,4444);
    
    // await xola.increaseAllowance(fc.address,3333, {from: accounts[1]})
    // await xola.increaseAllowance(fc.address,3333, {from: accounts[0]})
    // await xola.increaseAllowance(accounts[1],3333, {from: accounts[0]})
    // await xola.increaseAllowance(accounts[0],3333, {from: accounts[0]})

     //await xla.increaseAllowance(fc.address,3333, {from: accounts[1]})
     //await xla.increaseAllowance(fc.address,3333, {from: accounts[0]})
    // await xla.increaseAllowance(accounts[1],3333, {from: accounts[0]})
    // await xla.increaseAllowance(accounts[0],3333, {from: accounts[0]})

//const balance =  await xola.balanceOf(accounts[1]);
      //const balance = await tokenInstance.getBalance.call(accounts[0]);
    
    //await fc.transferERC20(xola.address, fc.address, 300, {from: accounts[1]})
    //await xola.Allowance()//xola
    //await xola.approve(fc.address,3333, {from: accounts[1]})
  // await xola.approve(accounts[1],3333);
    // await xola.approve(accounts[0],3333);


  });
});
