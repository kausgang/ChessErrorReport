import logo from "./logo.svg";
import "./App.css";
import Board from "./Board";
import { Chess } from "chess.js";
import React, { useState, useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import MoveTable from "./MoveTable";

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
  const [moves, setMoves] = useState([]);

  // console.log(sideToMove);

  // const onLegalMove = (fen, history, pgn) => {
  //   console.log("fen=", fen, "history=", history, "pgn=", pgn);
  // };

  const onLegalMove = (game) => {
    // setSideToMove("b");
    // if (sideToMove === "b") {
    // setSideToMove("w");
    // }
    // let history = game.history({ verbose: true });
    // let sanMove;
    // if (history.length !== 0) {
    //   sanMove = history[history.length - 1].san;
    //   console.log(sanMove);
    // }
    // setMoves([...moves, { id: Math.random(), white: "", black: "e5" }]);
  };

  const setPlayAs = (event, playas) => {
    setOrientation(playas);
    //if black is played - start the game
    changeSideToMove("w");
    // disable the black button after it has been clicked once
    event.target.disabled = "true";
  };

  const changeSideToMove = (side) => {
    // console.log(side);
    setSideToMove(side);

    let fen = game.fen();
    // console.log(fen);

    let depth = 10;
    engine.postMessage("position fen " + fen);
    engine.postMessage("go depth " + depth);

    engine.onmessage = function (line) {
      // console.log(line.data);

      let last_line = line.data.match("info depth " + depth);

      let best_move = line.data.match(/bestmove\s+(\S+)/);

      // if (last_line) console.log(last_line);
      // if (best_move) console.log(best_move[1]);
      if (best_move[1] !== null) game.move(best_move[1]);
      setFen(game.fen());
    };
  };

  // const TestEngineMove = () => {
  //   game.move("e5");
  //   setFen(game.fen());
  // };
  return (
    <>
      {/* <button onClick={test_click}>test</button> */}
      {/* <button onClick={TestEngineMove}>TestEngineMove</button> */}
      {/* <Board onLegalMove={onLegalMove} orientation={orientation} /> */}

      <Board
        onLegalMove={onLegalMove}
        orientation={orientation}
        game={game}
        position={fen}
        changeSideToMove={changeSideToMove}
      />
      {/* <MoveTable moves={moves} /> */}
      <ToggleButtonGroup
        color="primary"
        value={orientation}
        exclusive
        onChange={setPlayAs}
      >
        <ToggleButton value="white">white</ToggleButton>
        <ToggleButton value="black">Play as Black</ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}

export default App;
