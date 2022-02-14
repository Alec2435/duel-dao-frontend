import { useRouter } from "next/router";
import Root from "../../../src/components/Root";
import { useChessBoardState } from "../../../src/service/contract-interface";

const GamePage = (props) => {
    const router = useRouter();
    const gameId = router.query.gameid as string;
    const [boardState, refreshBoardState] = useChessBoardState(gameId);

    return (
        <Root>
            <pre>{JSON.stringify(boardState, null, 4)}</pre>
        </Root>
    );
};

export default GamePage;
