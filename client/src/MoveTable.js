import React from "react";
import { DataGrid } from "@mui/x-data-grid";

function MoveTable(props) {
  const columns = [
    { field: "id", headerName: "SL#" },
    { field: "white", headerName: "WHITE" },
    { field: "black", headerName: "BLACK" },
  ];

  const rows = [
    //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 1, white: "e4", black: "" },
    // { id: 2, white: "", black: "e5" },
  ];
  return (
    <div style={{ height: 450, width: "30%" }}>
      <DataGrid
        // rows={rows}

        rows={props.moves}
        columns={columns}
      />
    </div>
  );
}

export default MoveTable;
