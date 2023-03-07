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
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import ShowMoves from "./ShowMoves";

var engine = new Worker("stockfish.js");
// const MySwal = withReactContent(Swal);

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

  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [progress, setProgress] = React.useState(0);

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

  const onAnalyze = () => {
    // game.pgn()===""?return 0:alert("Play a game");
    if (game.pgn() === "" || game.pgn() === null) alert("Play a game");
    else {
      // open modal
      handleOpen();

      axios
        .post("http://localhost:5000/analyze", {
          pgn: game.pgn(),
          history: game.history(),
        })
        .then(function (response) {
          handleClose();
          console.log(response);
          alert("Analysis successful");
        })
        .catch(function (error) {
          console.log(error);
          alert("server down");
          handleClose();
        });
    }

    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);

    return () => {
      clearInterval(timer);
    };
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <CircularProgress /> */}
          <CircularProgress variant="determinate" value={progress} />
        </Box>
      </Modal>
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
          <Button variant="contained" onClick={onAnalyze}>
            Analyze
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
