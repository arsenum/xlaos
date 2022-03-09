const Simple = artifacts.require("Simple");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("SimpleTest", function (/* accounts */) {
  it("should assert true", async function () {
    const simple  = await Simple.new();
    await simple.updateData(50);
    var x = await simple.readData();
    console.log(x);
    //await Simple.deployed();
    return assert.isTrue(true);
  });
});
