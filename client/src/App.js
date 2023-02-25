import logo from "./logo.svg";
import "./App.css";
import Board from "./Board";
import { Chess } from "chess.js";
import React, { useState, useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import MoveTable from "./MoveTable";
import EngineLevel from "./EngineLevel";
import Status from "./Status";

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
  const [cp, setCp] = useState();
  const [depth, setDepth] = useState(5);

  // console.log(sideToMove);

  // const onLegalMove = (fen, history, pgn) => {
  //   console.log("fen=", fen, "history=", history, "pgn=", pgn);
  // };

  const onLegalMove = (game) => {
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
  };

  const setPlayAs = (event, playas) => {
    setOrientation(playas);
    //if "play as black" is clicked - start the game
    changeSideToMove("w");
    // disable the black button after it has been clicked once
    event.target.disabled = "true";
  };

  const changeSideToMove = (side) => {
    // console.log(side);
    setSideToMove(side);

    let fen = game.fen();
    console.log(depth);

    // let depth = 10;
    engine.postMessage("position fen " + fen);
    engine.postMessage("go depth " + depth);

    engine.onmessage = function (line) {
      // console.log(line.data);

      let last_line = line.data.match("info depth " + depth);

      let best_move = line.data.match(/bestmove\s+(\S+)/);

      // if (last_line !== null) console.log(last_line.input);
      // console.log(sideToMove);

      if (last_line !== null) {
        console.log(last_line.input);
        let cp_substr_start = last_line.input.indexOf("cp") + 3;
        let cp_substr_end = last_line.input.indexOf("nodes") - 1;
        let cp_value = last_line.input.substring(
          cp_substr_start,
          cp_substr_end
        );
        console.log("cp value = ", cp_value / 100);

        // if (sideToMove === "w") setCp(-cp_value / 100);
        // else {
        //   setCp(cp_value / 100);
        //   console.log("else loop");
        // }

        console.log(orientation);
        orientation === "white"
          ? setCp(-cp_value / 100)
          : setCp(cp_value / 100);
      }

      if (best_move[1] !== null) game.move(best_move[1]);
      setFen(game.fen());
    };
  };

  const onsetDepth = (newDepth) => {
    setDepth(newDepth);
  };
  const updateCp = (cp_value) => {
    // console.log("here now cp=", cp_value);
    setCp(cp_value);
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
        // cp={cp}
        updateCp={updateCp}
        depth={depth}
      />
      <Status cp_value={cp} />
      <EngineLevel onsetDepth={onsetDepth} />

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
