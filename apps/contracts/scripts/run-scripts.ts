// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    const contract = await ethers.getContractAt(
        "Chess",
        "0xc6e7DF5E7b4f2A278906862b61205850344D4e7d",
    );

    const gameId =
        "0xe40c7178353ff54fdd5717d06416909e4be85d76af2bd44f7c56a0c942c59a65";

    const games = await contract.getGamesOfPlayer(
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    );
    console.log(games);

    const gameData = await contract.getGameData(gameId);
    console.log(gameData);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
