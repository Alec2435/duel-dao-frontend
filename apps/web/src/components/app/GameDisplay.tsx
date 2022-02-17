import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Container, Grid } from "@material-ui/core";
import { Chessboard, Pieces, Square } from "react-chessboard";
import {
    squareToIndex,
    stateToPosition,
    useChessBoardState,
    useContract,
    useGameData,
} from "../../service/contract-interface";
import { useWeb3Account } from "../../service/web3-provider";
import theme from "../../theme";
import { maxWidth } from "@material-ui/system";
import PlayerInfo from "./PlayerInfo";

const useStyles = makeStyles({
    root: {},
    gameDisplay: {
        display: "flex",
        flexDirection: "row",
    },
    infoBox: {
        width: "100%",
        height: "100%",
        border: "1px solid #212838",
        borderRadius: 8,
        padding: theme.spacing(2),
    },
    gameBoard: {
        textAlign: "center",
    },
});

export interface GameDisplayProps {
    // position?: string | CurrentPosition;
    gameId?: string;
}

const GameDisplay = ({ gameId }: GameDisplayProps) => {
    const classes = useStyles();

    const { provider } = useWeb3Account();
    const contract = useContract(provider);
    const [boardState, refreshBoardState] = useChessBoardState(gameId);
    const [gameData, refreshGameData] = useGameData(gameId);

    const positions = stateToPosition(boardState);

    const handleMove = (
        source: Square,
        target: Square,
        piece: Pieces,
    ): boolean => {
        const sourceIndex = squareToIndex(source);
        const targetIndex = squareToIndex(target);
        console.log({ sourceIndex, targetIndex });
        contract
            .move(gameId, sourceIndex, targetIndex)
            .then((tsx) => tsx.wait())
            .then(() => {
                refreshBoardState();
                refreshGameData();
            });
        return true;
    };

    return (
        <div className={classes.root}>
            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={0}
                    alignItems="stretch"
                    justifyContent="center"
                    style={{ marginTop: 120 }}
                >
                    <Grid item xs={3}>
                        <div className={classes.infoBox}>
                            {!gameData ? null : (
                                <>
                                    <PlayerInfo
                                        alias={gameData.player1Alias}
                                        address={gameData.player1}
                                    />
                                    <PlayerInfo
                                        alias={gameData.player2Alias}
                                        address={gameData.player2}
                                    />
                                </>
                            )}
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.gameBoard}>
                            <Chessboard
                                position={positions}
                                boardWidth={450}
                                customBoardStyle={{
                                    border: "1px solid #006DBD",
                                    boxSizing: "border-box",
                                    borderRadius: 8,
                                    overflow: "hidden",
                                    margin: "0 auto",
                                }}
                                customDarkSquareStyle={{
                                    backgroundColor: "#006DBD00",
                                }}
                                customLightSquareStyle={{
                                    backgroundColor: "#006DBD",
                                }}
                                onPieceDrop={handleMove}
                                showBoardNotation={false}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div className={classes.infoBox}></div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default GameDisplay;
