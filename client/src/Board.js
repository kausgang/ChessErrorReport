import React, { useState, useEffect } from "react";
import Chessboard from "chessboardjsx";
// import { Chess } from "chess.js";

function Board(props) {
  const game = props.game;
  const [fen, setFen] = useState("start");
  const [history, setHistory] = useState([]);
  const [pgn, setPgn] = useState("");

  useEffect(() => {
    setFen(props.game.fen()); //fen holds the position reached after dropping this piece
  });

  const onDrop = ({ sourceSquare, targetSquare }) => {
    try {
      props.game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // always promote to a queen for example simplicity
      });

      setFen(props.game.fen()); //fen holds the position reached after dropping this piece

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
  );
}

export default Board;
