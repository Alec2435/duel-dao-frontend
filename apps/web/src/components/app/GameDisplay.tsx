import React, { Component } from "react";
import { makeStyles } from "@material-ui/styles";
import { Container, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { Chessboard } from "react-chessboard";

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
  },
  gameBoard: {
    textAlign: "center",
  },
});

const GameDisplay = (props) => {
  const classes = useStyles();

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
            <div className={classes.infoBox}></div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.gameBoard}>
              <Chessboard
                boardWidth={450}
                customBoardStyle={{
                  border: "1px solid #006DBD",
                  boxSizing: "border-box",
                  borderRadius: 8,
                  overflow: "hidden",
                  margin: "0 auto",
                }}
                customDarkSquareStyle={{ backgroundColor: "#006DBD00" }}
                customLightSquareStyle={{ backgroundColor: "#006DBD" }}
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
