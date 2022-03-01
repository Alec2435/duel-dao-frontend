// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

export async function deployChess(): Promise<string> {
    const ChessLogic = await ethers.getContractFactory("ChessLogic");
    const chessLogic = await ChessLogic.deploy();
    await chessLogic.deployed();
    console.log("ChessLogic deployed to:", chessLogic.address);

    const ELO = await ethers.getContractFactory("ELO");
    const elo = await ELO.deploy();
    await elo.deployed();
    console.log("ELO deployed to:", elo.address);

    const Chess = await ethers.getContractFactory("Chess", {
        libraries: {
            ChessLogic: chessLogic.address,
            ELO: elo.address,
        },
    });
    const chess = await Chess.deploy(false);

    await chess.deployed();

    console.log("Chess deployed to:", chess.address);
    return chess.address;
}

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    // We get the contract to deploy
    await deployChess();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// main().catch((error) => {
//     console.error(error);
//     process.exitCode = 1;
// });
