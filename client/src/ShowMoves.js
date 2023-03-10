import React from "react";
import Typography from "@mui/material/Typography";
let pgn = [],
  fen = [];
function ShowMoves(props) {
  console.log(props.moves.lastmove);

  if (props.moves.pgn === undefined) pgn = [];
  else {
    pgn = props.moves.pgn.split(" ");
  }

  // console.log(pgn, fen);
  return (
    <div style={{ whiteSpace: "pre-wrap" }}>
      <Typography variant="h6" gutterBottom>
        {/* {props.moves.replaceAll(" ", "  --  ")} */}
        {/* {props.moves.replaceAll(" ", "  ----  ").replaceAll(".  ----", ".  ")} */}
        <button></button>
      </Typography>
    </div>
  );
}

export default ShowMoves;
