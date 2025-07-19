const hre = require("hardhat");

async function main() {
  const ToDolist = await hre.ethers.getContractFactory("ToDolist");

  // Deploy contract
  const toDoList = await ToDolist.deploy();

  // No need for `await toDoList.deployed()` in Ethers v6
  console.log("1  ETH deployed to:", toDoList.target); // use `.target` in Ethers v6
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});
