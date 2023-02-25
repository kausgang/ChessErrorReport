import React from "react";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";

function EngineLevel(props) {
  const handleChange = (event) => {
    props.onsetDepth(event.target.value);
  };
  return (
    <div>
      {/* <Box sx={{ m: 1, minWidth: 30 }}> */}
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-label">Depth</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.depth}
          // label="Age"
          autoWidth
          onChange={handleChange}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
        </Select>
      </FormControl>
      {/* </Box> */}
    </div>
  );
}

export default EngineLevel;
