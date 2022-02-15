import { useRouter } from "next/router";
import AppFrame from "../../../src/components/app/AppFrame";
import GameDisplay from "../../../src/components/app/GameDisplay";
import Root from "../../../src/components/Root";
import {
    stateToPosition,
    useChessBoardState,
} from "../../../src/service/contract-interface";

const GamePage = (props) => {
    const router = useRouter();
    const gameId = router.query.gameid as string;
    const [boardState, refreshBoardState] = useChessBoardState(gameId);

    const positions = stateToPosition(boardState);

    return (
        <AppFrame>
            <GameDisplay position={positions} />
        </AppFrame>
    );
};

export default GamePage;
