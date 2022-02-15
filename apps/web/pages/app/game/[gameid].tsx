import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import AppFrame from "../../../src/components/app/AppFrame";
import GameDisplay from "../../../src/components/app/GameDisplay";
import Root from "../../../src/components/Root";
import {
    joinGame,
    stateToPosition,
    useChessBoardState,
    useContract,
    useGameData,
} from "../../../src/service/contract-interface";
import { useWeb3Account } from "../../../src/service/web3-provider";

const GamePage = (props) => {
    const router = useRouter();
    const gameId = router.query.gameid as string;
    const [boardState, refreshBoardState] = useChessBoardState(gameId);
    const [gameData, refreshGameData] = useGameData(gameId);
    const { provider } = useWeb3Account();
    const contract = useContract(provider);

    const positions = stateToPosition(boardState);

    const acceptingJoin =
        contract && gameData && !!gameData.player2.match(/^0x0{40}$/);

    const handleJoin = async () => {
        if (contract && gameId) {
            await joinGame(contract, gameId, "Player 2");
            refreshGameData();
        }
    };

    return (
        <AppFrame>
            {acceptingJoin ? (
                <Button variant="contained" onClick={handleJoin}>
                    Join Game
                </Button>
            ) : null}
            <GameDisplay position={positions} />
        </AppFrame>
    );
};

export default GamePage;
