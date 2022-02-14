import { useRouter } from "next/router"
import { useChessBoardState } from "../../../src/service/contract-interface"

const GamePage = (props) => {
    const router = useRouter()
    console.log("Query", router.query)
    const gameId = router.query.gameid as string
    console.log("Game ID", gameId)
    const [boardState, refreshBoardState] = useChessBoardState(gameId)

    return <pre>{JSON.stringify(boardState, null, 4)}</pre>
}

export default GamePage