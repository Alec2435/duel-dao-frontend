import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import AppFrame from "../../../src/components/app/AppFrame";
import GameDisplay from "../../../src/components/app/GameDisplay";
import {
    joinGame,
    useContract,
    useGameData,
} from "../../../src/service/contract-interface";
import { useWeb3Account } from "../../../src/service/web3-provider";

const GamePage = (props) => {
    const router = useRouter();
    const gameId = router.query.gameid as string;
    const [gameData, refreshGameData] = useGameData(gameId);
    const { provider } = useWeb3Account();
    const contract = useContract(provider);

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
            <GameDisplay gameId={gameId} />
        </AppFrame>
    );
};

export default GamePage;
