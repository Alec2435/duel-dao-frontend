import { useEffect, useMemo, useState } from "react";
import { abi } from "./contract-abi/Chess.json";
import { BigNumber, ethers } from "ethers";
import { useWeb3Account } from "./web3-provider";
import { CurrentPosition, Square } from "react-chessboard";

const contractAddress = "0xc6e7DF5E7b4f2A278906862b61205850344D4e7d";
const contractABI = abi;

export type RawGameState = number[];
export type GameID = string;
export type Web3Provider =
    | ethers.providers.ExternalProvider
    | ethers.providers.JsonRpcFetchFunc;

export interface GameData {
    player1: string; //'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    player2: string; //'0x0000000000000000000000000000000000000000',
    player1Alias: string; //'Player 1',
    player2Alias: string; //'',
    nextPlayer: string; //'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    winner: string; //'0x0000000000000000000000000000000000000000',
    ended: boolean;
    pot: BigNumber; // { value: "0" },
    player1Winnings: BigNumber; // { value: "0" },
    player2Winnings: BigNumber; // { value: "0" },
    turnTime: BigNumber; // { value: "3600" },
    timeoutStarted: BigNumber; // { value: "0" },
    timeoutState: 0;
}

export async function initGame(
    contract: ethers.Contract,
    player1Alias: string,
) {
    const options = { value: ethers.utils.parseEther("0.0") };
    const initTxn = await contract.initGame(player1Alias, true, 3600, options);
    await initTxn.wait();
}

export async function joinGame(
    contract: ethers.Contract,
    id: string,
    player2Alias: string,
) {
    const transaction = await contract.joinGame(id, player2Alias);
    await transaction.wait();
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

export function useContract(
    provider: ethers.providers.Web3Provider | undefined,
) {
    return useMemo(() => {
        if (!provider) return undefined;
        const signer = provider.getSigner();
        return new ethers.Contract(contractAddress, contractABI, signer);
    }, [provider]);
}

export async function getPlayerGames(
    contract: ethers.Contract,
    address: string,
): Promise<string[]> {
    return contract.getGamesOfPlayer(address);
}

export function usePlayerGameIds(): [string[], () => void] {
    const { provider, address } = useWeb3Account();
    const contract = useContract(provider);
    const [playerGames, setPlayerGames] = useState([]);

    async function refreshBoardState() {
        if (contract && address) {
            try {
                const state = await getPlayerGames(contract, address);
                setPlayerGames(state);
            } catch (e) {
                console.error(e);
                setPlayerGames([]);
            }
        } else if (playerGames.length > 0) {
            setPlayerGames([]);
        }
    }

    // Refreshes the data on first run, and if the gameId changes
    useEffect(() => {
        refreshBoardState();
    }, [contract, address]);

    // TODO: listen to updates
    return [playerGames, refreshBoardState];
}

export function useJoinableGames(): [string[], () => void] {
    const { provider } = useWeb3Account();
    const contract = useContract(provider);
    const [data, setData] = useState([]);

    async function refreshData() {
        if (contract) {
            try {
                const state = await contract.getOpenGameIds();
                setData(state);
            } catch (e) {
                console.error(e);
                setData([]);
            }
        } else if (data.length > 0) {
            setData([]);
        }
    }

    // Refreshes the data on first run, and if the gameId changes
    useEffect(() => {
        refreshData();
    }, [contract]);

    // TODO: listen to updates
    return [data, refreshData];
}

export function useGameData(id: string): [GameData | undefined, () => void] {
    const { provider } = useWeb3Account();
    const contract = useContract(provider);
    const [data, setData] = useState(undefined);

    async function refreshData() {
        if (contract) {
            try {
                const state = await contract.getGameData(id);
                setData(state);
            } catch (e) {
                console.error(e);
                setData(undefined);
            }
        } else if (data.length > 0) {
            setData(undefined);
        }
    }

    // Refreshes the data on first run, and if the gameId changes
    useEffect(() => {
        refreshData();
    }, [contract]);

    // TODO: listen to updates
    return [data, refreshData];
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
