import React, { useState, useEffect } from "react";
import Chessboard from "chessboardjsx";
import Status from "./Status";

function Board(props) {
  const game = props.game;
  const [fen, setFen] = useState("start");
  const [history, setHistory] = useState([]);
  const [pgn, setPgn] = useState("");
  // const [cp, setCp] = useState();

  var engine = new Worker("stockfish.js");

  useEffect(() => {
    setFen(props.game.fen());

    // let fen = props.game.fen();

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
    //   }
    //   // console.log(best_move[1]);

    //   // if (last_line.input !== null) console.log("indexof cp is = ");
    // };
  });

  const onDrop = ({ sourceSquare, targetSquare }) => {
    let fen = props.game.fen();

    let depth = 10;
    engine.postMessage("position fen " + fen);
    engine.postMessage("go depth " + depth);

    engine.onmessage = function (line) {
      // console.log(line.data);

      let last_line = line.data.match("info depth " + depth);
      let best_move = line.data.match(/bestmove\s+(\S+)/);

      if (last_line !== null) {
        // console.log(last_line.input);
        let cp_substr_start = last_line.input.indexOf("cp") + 3;
        let cp_substr_end = last_line.input.indexOf("nodes") - 1;
        let cp_value = last_line.input.substring(
          cp_substr_start,
          cp_substr_end
        );
        // console.log("cp value = ", cp_value / 100);
        // setCp(cp_value / 100);
        props.updateCp(cp_value / 100);
      }
      // console.log(best_move[1]);

      // if (last_line.input !== null) console.log("indexof cp is = ");
    };

    try {
      props.game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // always promote to a queen for example simplicity
      });

      setFen(props.game.fen()); //fen holds the position reached after dropping this piece

      // check which side to move
      let game_history = props.game.history({ verbose: true });
      // console.log(game_history);
      let sideToMove = game_history[game_history.length - 1].color;
      console.log(sideToMove);

      sideToMove === "w"
        ? props.changeSideToMove("b")
        : props.changeSideToMove("w");

      // props.changeSideToMove("b");
      // (props)

      //   game.move({
      //     from: sourceSquare,
      //     to: targetSquare,
      //     promotion: "q", // always promote to a queen for example simplicity
      //   });

      //   setFen(game.fen()); //fen holds the position reached after dropping this piece
      //   setHistory(game.history({ verbose: true })); //history array holds all the moves played, the lan and san candidates of the history object shows the current move, the fen candidate of the history object shows the previous fen
      //   setPgn(game.pgn());
    } catch (error) {
      console.log("illigal move");
    }
  };
  return (
    <>
      <Chessboard
        width={450}
        position={fen}
        onDrop={onDrop}
        onLegalMove={props.onLegalMove(game)}
        orientation={props.orientation}
        boardStyle={{
          borderRadius: "5px",
          boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
        }}
      />
      {/* <Status cp_value={cp} /> */}
      <Status cp_value={props.cp} />
    </>
  );
}

export default Board;
