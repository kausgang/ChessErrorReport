import React from "react";
import Typography from "@mui/material/Typography";

function ShowMoves(props) {
  return (
    <div style={{ whiteSpace: "pre-wrap" }}>
      <Typography variant="h6" gutterBottom>
        {/* {props.moves.replace(" ", "    ")} */}
        {props.moves.replaceAll(" ", "        ")}
      </Typography>
    </div>
  );
}

export default ShowMoves;
