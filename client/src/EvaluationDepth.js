import React from "react";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

function EvaluationDepth(props) {
  const handleChange = (event) => {
    props.onsetEvaluationDepth(event.target.value);
  };
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-label">EvaluationDepth</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          //   value={props.depth}
          defaultValue="10"
          // label="Age"
          //   autoWidth
          onChange={handleChange}
        >
          <MenuItem value={1}>1 ply</MenuItem>
          <MenuItem value={5}>5 ply</MenuItem>
          <MenuItem value={10}>10 ply</MenuItem>
          <MenuItem value={15}>15 ply</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default EvaluationDepth;
