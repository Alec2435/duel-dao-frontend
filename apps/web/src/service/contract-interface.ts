import { useEffect, useState } from "react";
import { abi } from "./contract-abi/Chess.json";
import { ethers } from "ethers";
import { useWeb3Account } from "./web3-provider";
import { CurrentPosition, Square } from "react-chessboard";

const contractAddress = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";
const contractABI = abi;

export type RawGameState = number[];
export type GameID = string;
export type Web3Provider =
    | ethers.providers.ExternalProvider
    | ethers.providers.JsonRpcFetchFunc;

export async function initGame(
    provider: ethers.providers.Web3Provider,
    player1Alias: string,
) {
    const signer = provider.getSigner();
    const chessContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer,
    );

    const initTxn = await chessContract.initGame(player1Alias, true, 3600);

    const waited = await initTxn.wait();

    return initTxn.hash;
}

const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
const numbers = new Array(8).fill(0).map((_, i) => i + 1);

const stateArray: (Square | undefined)[] = numbers
    .reverse()
    .map((n) =>
        letters.map((l) => `${l}${n}`).concat(new Array(8).fill(undefined)),
    )
    .flatMap((items) => items) as (Square | undefined)[];

function stateNumberToType(pieceNumber: number): string | undefined {
    switch (Math.abs(pieceNumber)) {
        case 1:
            return "P"; // Pawn
        case 2:
            return "N"; // Knight
        case 3:
            return "B"; // Bishop
        case 4:
            return "R"; // Rook
        case 5:
            return "Q"; // Queen
        case 6:
            return "K"; // King
    }
    return undefined;
}

function stateNumberToPiece(pieceNumber: number): string {
    const color = pieceNumber > 0 ? "w" : "b";
    const pieceType = stateNumberToType(pieceNumber);
    if (pieceNumber === undefined) {
        return undefined;
    }
    return `${color}${pieceType}`;
}

export function stateToPosition(
    state: number[] | undefined,
): CurrentPosition | undefined {
    // const position: CurrentPosition = {}

    // return position
    if (!state) {
        return undefined;
    }
    return state.reduce((obj, v, i) => {
        const key = stateArray[i];
        if (!key || state[i] === 0) {
            return obj;
        }
        obj[key] = stateNumberToPiece(state[i]);
        return obj;
    }, {}) as CurrentPosition;
    // return null
}

export async function getPlayerGames(
    provider: ethers.providers.Web3Provider,
    address: string,
): Promise<string[]> {
    // getGamesOfPlayer
    const signer = provider.getSigner();
    const chessContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer,
    );

    const gameIds = await chessContract.getGamesOfPlayer(address);

    return gameIds;
}

export function usePlayerGameIds(): [string[], () => void] {
    const { provider, address } = useWeb3Account();
    const [playerGames, setPlayerGames] = useState([]);

    async function refreshBoardState() {
        if (provider && address) {
            const state = await getPlayerGames(provider, address);
            setPlayerGames(state);
        } else if (playerGames.length > 0) {
            setPlayerGames([]);
        }
    }

    // Refreshes the data on first run, and if the gameId changes
    useEffect(() => {
        refreshBoardState();
    }, [provider, address]);

    // TODO: listen to updates
    return [playerGames, refreshBoardState];
}

export async function getChessBoardState(
    provider: ethers.providers.Web3Provider,
    gameId: GameID,
): Promise<number[]> {
    const signer = provider.getSigner();
    const chessContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer,
    );

    const gameState = await chessContract.getCurrentGameState(gameId);

    return gameState;
}

export function useChessBoardState(
    gameId: GameID,
): [RawGameState | undefined, () => void] {
    const { provider, address } = useWeb3Account();
    const [boardState, setBoardState] = useState(undefined);

    async function refreshBoardState() {
        if (provider && address && gameId) {
            const state = await getChessBoardState(provider, gameId);
            setBoardState(state);
        } else if (boardState !== null) {
            setBoardState(undefined);
        }
    }

    // Refreshes the data on first run, and if the gameId changes
    useEffect(() => {
        // If the gameId changed, and we have a boardState, change it to null while we load the new one
        if (boardState !== null) {
            setBoardState(undefined);
        }
        refreshBoardState();
    }, [gameId, provider, address]);

    return [boardState, refreshBoardState];
}
