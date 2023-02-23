const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const MyToken = await hre.ethers.getContractFactory("SendToken");
  const myToken = await MyToken.deploy("MyToken", "MTK");

  await myToken.deployed();

  console.log("MyToken deployed to:", myToken.address);
    
  //Pull the address and ABI out while you deploy, since that will be key in interacting with the smart contract later
  const data = {
    address: myToken.address,
    abi: JSON.parse(myToken.interface.format('json'))
  }

  //This writes the ABI and address to the marketplace.json
  //This data is then used by frontend files to connect with the smart contract
  fs.writeFileSync('./src/MyToken.json', JSON.stringify(data))
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
