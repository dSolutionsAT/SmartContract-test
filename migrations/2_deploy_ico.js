var cIT = artifacts.require("./cIT.sol");
var cITCrowdsale = artifacts.require("./cITCrowdsale.sol");

 const duration = {
    seconds: function (val) { return val; },
    minutes: function (val) { return val * this.seconds(60); },
    hours: function (val) { return val * this.minutes(60); },
    days: function (val) { return val * this.hours(24); },
    weeks: function (val) { return val * this.days(7); },
    years: function (val) { return val * this.days(365); },
  };


module.exports = async function (deployer,network ,accounts) {
    await deployer.deploy(cIT, "coinIT", "cIT", 18 );
    const deployedToken = await cIT.deployed();
    console.log(deployedToken.address)
    const rate = 1000; // 1 eth = 1000 cit
    const wallet = account[0];

    const openingTime = timeNow + duration.seconds(30); // Puffer
    const closingTime = timeNow + duration.years(1); // Wann wird ICO geschlossen
    const timeNow = Math.floor(Date.now() / 1000); //
    const cap = web3.toWei(1000); // 1000 Eth ist cap

    await deployer.deploy(cITCrowdsale,
        rate, wallet, deployedToken.address, openingTime, closingTime, cap
    );

    const deployedCrowdsale = await cITCrowdsale.deployed();
    console.log('aa',  deployedCrowdsale.address);
    await  deployedToken.trasnferOwnership(deployedCrowdsale.address);
    console.log('Contracts deployed: \n', deployedCrowdsale.address, deployedToken.address);
return true;

        // "coinIT", "cIT", 18 );
};