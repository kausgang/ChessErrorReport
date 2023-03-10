import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

let pgn = [],
  fen = [];
function ShowMoves(props) {
  console.log(props.moves.lastmove);
  let lastmove = props.moves.lastmove;
  fen = props.moves.fen;

  if (props.moves.pgn === undefined) pgn = [];
  else {
    pgn = props.moves.pgn.split(" ");
  }

  // console.log(pgn, fen);
  return (
    // <div style={{ whiteSpace: "pre-wrap" }}>
    <div>
      {/* <Typography variant="h6" gutterBottom> */}
      {/* {props.moves.replaceAll(" ", "  --  ")} */}
      {/* {props.moves.replaceAll(" ", "  ----  ").replaceAll(".  ----", ".  ")} */}
      <Box sx={{ width: 500 }}>
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
          {pgn.map((move) => {
            // if (move.indexOf(".") !== -1) return move;
            // else return move + "\n";

            return (
              <span>
                <Typography variant="h6" gutterBottom>
                  {move}
                </Typography>
              </span>
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
