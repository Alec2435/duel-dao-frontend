/**
 * Chess contract
 * Stores any amount of games with two players and current state.
 * State encoding:
 *    positive numbers for white, negative numbers for black
 *    for details, see
 *    https://github.com/ise-ethereum/on-chain-chess/wiki/Chess-board-representation
 */
pragma solidity ^0.8.10;

import "./ChessLogic.sol";
import "./TurnBasedGame.sol";

contract Chess is TurnBasedGame {

    using ChessLogic for ChessLogic.State;
    mapping (bytes32 => ChessLogic.State) gameStates;

    event GameInitialized(bytes32 indexed gameId, address indexed player1, string player1Alias, address playerWhite, uint turnTime, uint pot);
    event GameJoined(bytes32 indexed gameId, address indexed player1, string player1Alias, address indexed player2, string player2Alias, address playerWhite, uint pot);
    event GameStateChanged(bytes32 indexed gameId, int8[128] state);
    event Move(bytes32 indexed gameId, address indexed player, uint256 fromIndex, uint256 toIndex);
    event EloScoreUpdate(address indexed player, uint score);

    // TurnBasedGame(enableDebugging)
    constructor(bool enableDebugging) TurnBasedGame(enableDebugging) {
    }

    modifier notEnded(bytes32 gameId) {
        assert(!games[gameId].ended);
        _;
    }

    /**
     * Initialize a new game
     * string player1Alias: Alias of the player creating the game
     * bool playAsWhite: Pass true or false depending on if the creator will play as white
     */
    function initGame(string memory player1Alias, bool playAsWhite, uint turnTime) payable public returns (bytes32) {
        assert(turnTime >= 5);

        // Generate game id based on player's addresses and current block number
        bytes32 gameId = keccak256(abi.encodePacked(msg.sender, block.number));

        games[gameId].ended = false;
        games[gameId].turnTime = turnTime;
        games[gameId].timeoutState = 0;

        // Initialize participants
        games[gameId].player1 = msg.sender;
        games[gameId].player1Alias = player1Alias;
        games[gameId].player1Winnings = 0;
        games[gameId].player2Winnings = 0;

        // Initialize game value
        games[gameId].pot = msg.value * 2;

        // Add game to gamesOfPlayers
        gamesOfPlayers[msg.sender][gameId] = gamesOfPlayersHeads[msg.sender];
        gamesOfPlayersHeads[msg.sender] = gameId;

        // Add to openGameIds
        openGameIds[gameId] = head;
        head = gameId;

        // Setup game state
        int8 nextPlayerColor = int8(1);
        // gameStates[gameId].setupState(nextPlayerColor);
        if (playAsWhite) {
            // Player 1 will play as white
            gameStates[gameId].playerWhite = msg.sender;

            // Game starts with White, so here player 1
            games[gameId].nextPlayer = games[gameId].player1;
        }

        // Sent notification events
        // GameInitialized(gameId, games[gameId].player1, player1Alias, gameStates[gameId].playerWhite, games[gameId].turnTime, games[gameId].pot);
        // GameStateChanged(gameId, gameStates[gameId].fields);
        return gameId;
    }

    /**
     * Join an initialized game
     * bytes32 gameId: ID of the game to join
     * string player2Alias: Alias of the player that is joining
     */
    function joinGame(bytes32 gameId, string memory player2Alias) public {
    }

    /**
    *
    * verify signature of state
    * verify signature of move
    * apply state, verify move
    */
    function moveFromState(bytes32 gameId, int8[128] memory state, uint256 fromIndex,
                           uint256 toIndex, bytes memory sigState) notEnded(gameId) public {
    }

    function move(bytes32 gameId, uint256 fromIndex, uint256 toIndex) notEnded(gameId) public {
    }

    /* Explicit set game state. Only in debug mode */
    function setGameState(bytes32 gameId, int8[128] memory state, address nextPlayer) debugOnly public {
    }

    function getCurrentGameState(bytes32 gameId) public view returns (int8[128] memory) {
       return gameStates[gameId].fields;
    }

    function getWhitePlayer(bytes32 gameId) public view returns (address) {
       return gameStates[gameId].playerWhite;
    }

    function surrender(bytes32 gameId) notEnded(gameId) public {
    }

    /* The sender claims he has won the game. Starts a timeout. */
    function claimWin(bytes32 gameId) notEnded(gameId) public {
    }

    /*
     * The sender (currently waiting player) claims that the other (turning)
     * player timed out and has to provide a move, the other player could
     * have done to prevent the timeout.
     */
    function claimTimeoutEndedWithMove(bytes32 gameId, uint256 fromIndex, uint256 toIndex) notEnded(gameId) public {
    }

    /* The sender claims a previously started timeout. */
    function claimTimeoutEnded(bytes32 gameId) notEnded(gameId) public {
    }

    /* A timeout can be confirmed by the non-initializing player. */
    function confirmGameEnded(bytes32 gameId) notEnded(gameId) public {
    }

    /* This unnamed function is called whenever someone tries to send ether to the contract */
    // function fallback() {
    //     throw; // Prevents accidental sending of ether
    // }
}
