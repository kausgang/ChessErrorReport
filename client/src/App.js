import logo from "./logo.svg";
import "./App.css";
import Board from "./Board";
import { Chess } from "chess.js";
import React, { useState, useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import EngineMove from "./engineMove";

// import axios from "axios";

// const test_click = () => {
//   // alert("test");
//   axios
//     .get("http://localhost:4000/")
//     .then((res) => {
//       console.log(res);
//     })
//     .catch(function (error) {
//       // handle error
//       console.log(error);
//     })
//     .finally(function () {
//       // always executed
//     });
// };

var engine = new Worker("stockfish.js");

function App() {
  //ENGINE ANALYSIS LOGIC BELOW

  // let fen = "rnbqkbnr/pp2pppp/3p4/2pP4/2P5/8/PP2PPPP/RNBQKBNR b KQkq - 0 3";

  // let depth = 10;
  // engine.postMessage("position fen " + fen);
  // engine.postMessage("go depth " + depth);

  // engine.onmessage = function (line) {
  //   // console.log(line.data);

  //   let last_line = line.data.match("info depth " + depth);
  //   let best_move = line.data.match(/bestmove\s+(\S+)/);
  //   if (last_line) console.log(last_line);
  //   if (best_move) console.log(best_move[1]);
  // };

  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState("start");
  const [orientation, setOrientation] = useState("white");
  const [engineMove, setEngineMove] = useState("");
  const [sideToMove, setSideToMove] = useState("w");

  // const onLegalMove = (fen, history, pgn) => {
  //   console.log("fen=", fen, "history=", history, "pgn=", pgn);
  // };

  const onLegalMove = (game) => {
    // setSideToMove("b");
    // if (sideToMove === "b") {
    // setSideToMove("w");
    // }
  };

  const setPlayAs = (event, playas) => {
    setOrientation(playas);
    changeSideToMove("w");
  };

  const changeSideToMove = (side) => {
    setSideToMove(side);
    console.log(side);

    let fen = game.fen();

    let depth = 3;
    engine.postMessage("position fen " + fen);
    engine.postMessage("go depth " + depth);

    engine.onmessage = function (line) {
      // console.log(line.data);

      let last_line = line.data.match("info depth " + depth);
      let best_move = line.data.match(/bestmove\s+(\S+)/);
      // if (last_line) console.log(last_line);
      // if (best_move) console.log(best_move[1]);
      game.move(best_move[1]);
      setFen(game.fen());
    };
  };

  const TestEngineMove = () => {
    game.move("e5");
    setFen(game.fen());
  };
  return (
    <>
      {/* <button onClick={test_click}>test</button> */}
      <button onClick={TestEngineMove}>TestEngineMove</button>
      {/* <Board onLegalMove={onLegalMove} orientation={orientation} /> */}
      {/* <EngineMove /> */}

      <Board
        onLegalMove={onLegalMove}
        orientation={orientation}
        game={game}
        position={fen}
        // sideToMove={sideToMove}
        changeSideToMove={changeSideToMove}
      />

      <ToggleButtonGroup
        color="primary"
        value={orientation}
        exclusive
        onChange={setPlayAs}
        // aria-label="Platform"
      >
        <ToggleButton value="white">white</ToggleButton>
        <ToggleButton value="black">Black</ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}

export default App;
