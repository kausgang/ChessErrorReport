// import logo from "./logo.svg";
import "./App.css";
import Board from "./Board";
import { Chess } from "chess.js";
import React, { useState, useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// import MoveTable from "./MoveTable";
import EngineLevel from "./EngineLevel";
import Status from "./Status";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Grid from "@mui/material/Unstable_Grid2";
import { saveGame } from "./DB/saveGame";

import ShowMoves from "./ShowMoves";

var engine = new Worker("stockfish.js");
const MySwal = withReactContent(Swal);

function App() {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState("start");
  const [orientation, setOrientation] = useState("white");
  const [engineMove, setEngineMove] = useState("");
  // const [sideToMove, setSideToMove] = useState("w");
  const [gameStarted, setGameStarted] = useState(false);

  const [moves, setMoves] = useState("");
  const [cp, setCp] = useState();
  const [depth, setDepth] = useState(15);

  // let depth = 10;
  // engine.postMessage("position fen " + fen);
  // engine.postMessage("go depth " + depth);
  // engine.onmessage = function (line) {
  //   // console.log(line.data);
  //   let last_line = line.data.match("info depth " + depth);
  //   let best_move = line.data.match(/bestmove\s+(\S+)/);
  //   if (last_line !== null) {
  //     // console.log(last_line.input);
  //     let cp_substr_start = last_line.input.indexOf("cp") + 3;
  //     let cp_substr_end = last_line.input.indexOf("nodes") - 1;
  //     let cp_value = last_line.input.substring(
  //       cp_substr_start,
  //       cp_substr_end
  //     );
  //     // console.log("cp value = ", cp_value / 100);
  //     setCp(cp_value / 100);
  //     // props.updateCp(cp_value / 100);
  //   }
  // };
  // sideToMove === "w" ? changeSideToMove("b") : changeSideToMove("w");
  // };

  const setPlayAs = (event, playas) => {
    event.target.disabled = "true";
    setOrientation(playas);
    //if "play as black" is clicked - start the game
    changeSideToMove("w");
    // disable the black button after it has been clicked once
    event.target.disabled = "true";
  };

  const changeSideToMove = (side) => {
    // setSideToMove(side);

    let fen = game.fen();

    engine.postMessage("position fen " + fen);
    engine.postMessage("go depth " + depth);

    engine.onmessage = function (line) {
      let cp_value = 0.5;

      let last_line = line.data.match("info depth " + depth);

      let best_move = line.data.match(/bestmove\s+(\S+)/);

      if (last_line !== null) {
        let cp_substr_start = last_line.input.indexOf("cp") + 3;
        let cp_substr_end = last_line.input.indexOf("nodes") - 1;
        cp_value = last_line.input.substring(cp_substr_start, cp_substr_end);

        // if (cp_value.isNaN()) {
        orientation === "white"
          ? setCp(-cp_value / 100)
          : setCp(cp_value / 100);
        // } else {
        //   setCp(cp_value);
        // }
      }

      try {
        if (best_move[1] !== null) game.move(best_move[1]);
        setFen(game.fen());
        updateMoves();
      } catch (err) {}

      // check for gameover
      if (game.isCheckmate()) {
        alert("Checkmate!");
      }
      if (game.isDraw()) {
        alert("Draw!");
      }
      if (game.isStalemate()) {
        alert("Stalemate!");
      }
    };
  };

  const onsetDepth = (newDepth) => {
    setDepth(newDepth);
  };
  const updateCp = (cp_value) => {
    setCp(cp_value);
  };

  const updateMoves = () => {
    setMoves(game.pgn({ maxWidth: 10, newline: "\n" }));
  };

  const onSetGameStarted = (isGamgstarted) => {
    setGameStarted(isGamgstarted);
  };

  const onSaveGame = () => {
    if (orientation === "white") {
      game.header("White", "Human");
      game.header("Black", "Computer");
    } else {
      game.header("White", "Computer");
      game.header("Black", "Human");
    }

    saveGame(game.pgn());
  };

  return (
    <>
      <Grid container spacing={"20%"}>
        <Grid xs={4}>
          <EngineLevel onsetDepth={onsetDepth} />
          <Status cp_value={cp} game={game} />
          <ShowMoves moves={moves} />
        </Grid>
        <Grid xs={8}>
          <Board
            // onLegalMove={onLegalMove}
            orientation={orientation}
            game={game}
            position={fen}
            changeSideToMove={changeSideToMove}
            cp={cp}
            updateCp={updateCp}
            depth={depth}
            updateMoves={updateMoves}
            gameStarted={gameStarted}
            onSetGameStarted={onSetGameStarted}
          />
          <ToggleButtonGroup
            color="primary"
            value={orientation}
            exclusive
            onChange={setPlayAs}
            disabled={gameStarted ? true : false}
          >
            {/* <ToggleButton value="white">white</ToggleButton> */}
            <ToggleButton value="black">Play as Black</ToggleButton>
          </ToggleButtonGroup>
          <Button variant="contained" onClick={onSaveGame}>
            copy to clipboard
          </Button>
        </Grid>

        {/* <MoveTable moves={moves} /> */}

        {/* <Button variant="contained" onClick={pgn}>
        PGN
      </Button> */}
        {/* <Button variant="contained" onClick={showMoves}>
        Moves
      </Button> */}
      </Grid>
    </>
  );
}

export default App;
