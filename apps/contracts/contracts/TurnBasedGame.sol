contract TurnBasedGame {
    bool debug; // If contract is deployed in debug mode, some debug features are enabled
    modifier debugOnly {
        assert(debug);
        _;
    }

    event GameEnded(bytes32 indexed gameId);
    event GameClosed(bytes32 indexed gameId, address indexed player);
    event GameTimeoutStarted(bytes32 indexed gameId, uint timeoutStarted, int8 timeoutState);
    // GameDrawOfferRejected: notification that a draw of the currently turning player
    //                        is rejected by the waiting player
    event GameDrawOfferRejected(bytes32 indexed gameId);
    event DebugInts(string message, uint value1, uint value2, uint value3);

    struct Game {
        address player1;
        address player2;
        string player1Alias;
        string player2Alias;
        address nextPlayer;
        address winner;
        bool ended;
        uint pot; // What this game is worth: ether paid into the game
        uint player1Winnings;
        uint player2Winnings;
        uint turnTime; // in minutes
        uint timeoutStarted; // timer for timeout
        /*
         * -2 draw offered by nextPlayer
         * -1 draw offered by waiting player
         * 0 nothing
         * 1 checkmate
         * 2 timeout
         */
        int8 timeoutState;
    }

    mapping (bytes32 => Game) public games;

    // stack of open game ids
    mapping (bytes32 => bytes32) public openGameIds;
    bytes32 public head;

    // stack of games of players
    mapping (address => mapping (bytes32 => bytes32)) public gamesOfPlayers;
    mapping (address => bytes32) public gamesOfPlayersHeads;


    constructor(bool enableDebugging) {
        debug = enableDebugging;
        head = 'end';
    }
}