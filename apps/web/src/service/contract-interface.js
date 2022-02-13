import { useEffect, useState } from "react"
import { abi } from "./contract-abi/Chess.json"
import { ethers } from "ethers"

// const contractAddress = '0xe6748c2E34dF3A435fbCa90199f9F153Fa9F4Cde';
// const contractABI = abi;

/**
 * 
 * @param {number} gameId byte32
 * @returns 
 */
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
 */
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