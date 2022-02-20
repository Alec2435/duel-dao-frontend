import { useEffect, useMemo, useState } from "react";
import { abi } from "./contract-abi/Chess.json";
import { BigNumber, ethers } from "ethers";
import { useWeb3Account } from "./web3-provider";
import { CurrentPosition, Square } from "react-chessboard";

const contractAddress = "0xb9bEECD1A582768711dE1EE7B0A1d582D9d72a6C";
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
    nextPlayerIndex: BigNumber; // 1 | 2,
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

export function squareToIndex(square: Square): number {
    const x = letters.indexOf(square[0]);
    const y = parseInt(square[1]);
    if (isNaN(y) || x === -1 || typeof y !== "number") {
        throw new Error("Invalid square");
    }
    return (8 - y) * 16 + x;
}

if (typeof window !== "undefined") {
    window["sqi"] = squareToIndex;
}

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
    const { provider, address: activeAddress } = useWeb3Account();
    const contract = useContract(provider);
    const [playerGames, setPlayerGames] = useState([]);

    async function refreshBoardState() {
        if (contract && activeAddress) {
            try {
                const state = await getPlayerGames(contract, activeAddress);
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
    }, [contract, activeAddress]);

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
        } else if (data !== undefined) {
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

export function useChessController(contract: ethers.Contract, gameId: string) {
    const [boardState, setBoardState] = useState<number[] | undefined>(
        undefined,
    );
    const [tempState, setTempState] = useState<CurrentPosition | undefined>(
        undefined,
    );
    // const [boardState, setBoardState] = useState(undefined);

    async function refreshBoardState() {
        if (contract && gameId) {
            const state: number[] = await contract.getCurrentGameState(gameId);
            setBoardState(state);
        } else if (boardState !== undefined) {
            setBoardState(undefined);
        }
    }

    const contractBoardPosition = useMemo(() => {
        if (!boardState) return undefined;
        return stateToPosition(boardState);
    }, [boardState]);

    async function move(source: Square, target: Square) {
        // Sets the temporary board state
        const newBoardPosition = contractBoardPosition
            ? {
                  ...contractBoardPosition,
                  [target]: contractBoardPosition[source],
              }
            : undefined;
        delete newBoardPosition[source];
        setTempState(newBoardPosition);

        try {
            // Converts source and target to the contract interface
            const sourceIndex = squareToIndex(source);
            const targetIndex = squareToIndex(target);

            const txn = await contract.move(gameId, sourceIndex, targetIndex);
            await txn.wait();
            await refreshBoardState();
        } finally {
            setTempState(undefined);
        }
    }

    // Refreshes the data on first run, and if the gameId changes
    useEffect(() => {
        // If the gameId changed, and we have a boardState, change it to null while we load the new one
        if (boardState !== undefined) {
            setBoardState(undefined);
        }
        refreshBoardState();
    }, [gameId, contract]);

    return {
        positions: tempState ?? contractBoardPosition,
        refreshState: refreshBoardState,
        move,
    };
}
