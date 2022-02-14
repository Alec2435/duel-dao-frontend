import { useEffect, useState } from "react"
import { abi } from "./contract-abi/Chess.json"
import { ethers } from "ethers"
import { useWeb3Account } from "./web3-provider";

const contractAddress = '0x8A791620dd6260079BF849Dc5567aDC3F2FdC318';
const contractABI = abi;

export type RawGameState = number[]
export type GameID = string // TODO: byte32
export type Web3Provider = ethers.providers.ExternalProvider | ethers.providers.JsonRpcFetchFunc

export async function initGame(provider: ethers.providers.Web3Provider, player1Alias: string) {
    const signer = provider.getSigner();
    const chessContract = new ethers.Contract(contractAddress, contractABI, signer);

    const initTxn = await chessContract.initGame(player1Alias, true, 3600);

    // const createTxn = await keyboardsContract.create(keyboardKind, isPBT, filter)
    // console.log('Create transaction started...', createTxn.hash)
    console.log("initTxn", initTxn)

    const waited = await initTxn.wait();

    console.log("waited", waited)

    return initTxn.hash
}

export async function getPlayerGames(provider: ethers.providers.Web3Provider, address: string): Promise<string[]> {
    // getGamesOfPlayer
    const signer = provider.getSigner();
    const chessContract = new ethers.Contract(contractAddress, contractABI, signer);

    const gameIds = await chessContract.getGamesOfPlayer(address);
    console.log("Game IDs", gameIds)

    return gameIds
}

export function usePlayerGameIds(): [string[], () => void] {
    const { provider, address } = useWeb3Account();
    const [playerGames, setPlayerGames] = useState([])

    async function refreshBoardState() {
        if (provider && address) {
            const state = await getPlayerGames(provider, address)
            setPlayerGames(state)
        }
    }

    // Refreshes the data on first run, and if the gameId changes
    useEffect(() => {
        refreshBoardState()
    }, [provider, address])

    // TODO: listen to updates
    return [
        playerGames, refreshBoardState
    ]
}



export async function getChessBoardState(provider: ethers.providers.Web3Provider, gameId: GameID): Promise<number[]> {
    const signer = provider.getSigner();
    const chessContract = new ethers.Contract(contractAddress, contractABI, signer);

    const gameState = await chessContract.getCurrentGameState(gameId);
    console.log("Game State", gameState)

    return gameState
}

export function useChessBoardState(gameId: GameID): [any, () => void] {
    const { provider, address } = useWeb3Account();
    const [boardState, setBoardState] = useState(null)

    async function refreshBoardState() {
        console.log("Refreshing board", {gameId, address, provider})
        if (provider && address && gameId) {
            console.log("Refreshing board FOREAL", gameId, address)
            const state = await getChessBoardState(provider, gameId)
            setBoardState(state)
        }
        console.log("Done Refreshing")
    }

    // Refreshes the data on first run, and if the gameId changes
    useEffect(() => {
        // If the gameId changed, and we have a boardState, change it to null while we load the new one
        if (boardState !== null) {
            setBoardState(null)   
        }
        refreshBoardState()
    }, [gameId, provider, address])

    return [
        boardState, refreshBoardState
    ]
}

/*

import { useEffect, useState } from "react"
import { abi } from "./contract-abi/Chess.json"
import { ethers } from "ethers"

// const contractAddress = '0xe6748c2E34dF3A435fbCa90199f9F153Fa9F4Cde';
// const contractABI = abi;

/**
 * 
 * @param {number} gameId byte32
 * @returns 
 
 export async function getChessBoardState(gameId) {
    // TODO: need to get the ethereum
    // if (ethereum && connectedAccount) {
    //     const provider = new ethers.providers.Web3Provider({});
    //     const signer = provider.getSigner();
    //     const chessContract = new ethers.Contract(contractAddress, contractABI, signer);

    //     const currentGameState = await chessContract.getCurrentGameState(gameId);
    // }
    // return currentGameState
    return {}
}

/**
 * 
 * @param {number} gameId byte32
 * @returns {[null | {}, () => void]}
 
export function useChessBoardState(gameId) {
    const [boardState, setBoardState] = useState(null)

    async function refreshBoardState() {
        const state = await getChessBoardState(gameId)
        setBoardState(state)
    }

    // Refreshes the data on first run, and if the gameId changes
    useEffect(() => {
        // If the gameId changed, and we have a boardState, change it to null while we load the new one
        if (boardState !== null) {
            setBoardState(null)   
        }
        refreshBoardState()
    }, [gameId])

    return [
        boardState, refreshBoardState
    ]
}

*/