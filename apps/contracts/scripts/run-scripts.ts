// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { deployChess } from "./deploy-chess";

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    const [player1, player2] = await ethers.getSigners();

    const contractAddress = await deployChess();

    const contract = await ethers.getContractAt("Chess", contractAddress);

    const player = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

    let games =
        (await contract.getGamesOfPlayer(
            "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        )) ?? [];

    if (games.length === 0) {
        const txn = await contract.initGame("Player 1", true, 3600);
        await txn.wait();

        games = await contract.getGamesOfPlayer(
            "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        );
    }

    const gameId = games[0];

    console.log("Got a game", gameId);

    const gameData = contract.getGameData(gameId);

    if (!gameData.player2 || gameData.player2.match(/0x0{40}/)) {
        const txn2 = await contract
            .connect(player2)
            .joinGame(gameId, "Player 2", {
                from: player2.address,
            });
        await txn2.wait();
        console.log("Joined the game");
    }
    // const gameId =
    //     "0x5f29270bad59ba5f29a04cffb8a0078fd86939a09c268e4f7dcc3c400c71859f";

    // console.log(games);

    // const gameData = await contract.getGameData(gameId);

    // console.log(gameData);
    console.log("Moving");
    const abc = await contract.move(gameId, 101, 69);
    // const abc = await contract.move(gameId, 20, 52);
    await abc.wait();
    console.log(abc);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
