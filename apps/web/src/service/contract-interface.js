import { useEffect, useState } from "react"

export async function getChessBoardState() {
    return {}
}

export function useChessBoardState() {
    const [boardState, setBoardState] = useState({})

    async function refreshBoardState() {
        const state = await getChessBoardState()
        setBoardState(state)
    }

    useEffect(() => { refreshBoardState() }, [])

    return [
        boardState, refreshBoardState
    ]
}