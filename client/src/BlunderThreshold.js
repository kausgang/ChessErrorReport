import React from "react";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

function BlunderThreshold(props) {
  const handleChange = (event) => {
    props.onsetBlunderThresold(event.target.value);
  };
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-label">Blndr_thr</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          //   value={props.depth}
          defaultValue="100"
          // label="Age"
          //   autoWidth
          onChange={handleChange}
        >
          <MenuItem value={100}>1 pawn</MenuItem>
          <MenuItem value={150}>1.5 pawn</MenuItem>
          <MenuItem value={200}>2 pawns</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default BlunderThreshold;
