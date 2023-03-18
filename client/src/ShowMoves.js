import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

let pgn = [],
  fen = [],
  lastmove = [];
function ShowMoves(props) {
  // console.log(props.moves.pgn, props.moves.fen, props.moves.lastmove);
  // let lastmove = props.moves.lastmove;
  // fen = props.moves.fen;

  if (props.moves.fen !== undefined) fen.push(props.moves.fen);
  if (props.moves.pgn !== undefined) {
    pgn = props.moves.pgn.split(" ");
    // console.log(pgn);
  }

  if (props.moves.lastmove !== undefined) lastmove.push(props.moves.lastmove);

  // console.log("fen=", fen, "lastmove=", lastmove);
  const getFen = (e) => {
    e.preventDefault();

    if (!props.gameover) {
      alert("end the game");
      return 1;
    }

    let move_clicked = e.target.id;
    // find move in lastmove array
    let move_index = lastmove.indexOf(move_clicked);

    if (move_index !== -1) {
      // get the fen from fen array for the move clicked
      let clicked_fen = fen[move_index];

      props.setFen(clicked_fen);

      // console.log(move_index);
    }
  };

  // console.log(pgn, fen);
  return (
    // <div style={{ whiteSpace: "pre-wrap" }}>
    <div>
      {/* <Typography variant="h6" gutterBottom> */}
      {/* {props.moves.replaceAll(" ", "  --  ")} */}
      {/* {props.moves.replaceAll(" ", "  ----  ").replaceAll(".  ----", ".  ")} */}
      <Box sx={{ width: 300 }}>
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
          {pgn.map((move, index) => {
            // if (move.indexOf(".") !== -1) return move;
            // else return move + "\n";

            return (
              <div key={index} onClick={getFen}>
                {/* <Typography variant="h6" gutterBottom> */}
                <a id={move} href="#">
                  {move}
                </a>
                {/* </Typography> */}
              </div>
            );
            // else
            //   return (
            //     <div>
            //       <span>{move + "\n"}</span>
            //     </div>
            //   );
          })}
        </Stack>
      </Box>
      {/* </Typography> */}
    </div>
  );
}

export default ShowMoves;
