import React, { useState, useEffect } from "react";
// import { BarChart, Bar } from "recharts";
// import { LineChart, Line } from "recharts";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

//props.cp_value holds the centipoint value

function Status(props) {
  const [data, setData] = useState([{}]);

  let data1 = [];

  useEffect(() => {
    data1 = [...data];

    let move_number = props.game.history().length;
    let remainder = move_number % 2;
    let quotient = Math.floor(move_number / 2);
    let updated_move_number;
    if (remainder !== 0) {
      updated_move_number = quotient + remainder;
    } else {
      updated_move_number = ".." + (quotient + remainder);
    }

    setData([
      ...data1,
      {
        cp: props.cp_value,
        move: props.game.history().pop(),
        // move_number: props.game.history().length,
        move_number: updated_move_number,
      },
    ]);

    // setData([...data1, { cp: "Mate 1" }]);
  }, [props.cp_value]);

  return (
    <LineChart
      width={500}
      height={200}
      data={data}
      margin={{
        top: 40,
        right: 50,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="move_number" />
      <YAxis axisLine={false} />
      <Tooltip />
      <Legend />
      <ReferenceLine y={0.5} stroke="red" label="Score=0" />
      <Line type="monotone" dataKey="cp" stroke="#8884d8" />
      <Line type="monotone" dataKey="move" stroke="#82ca9d" />
    </LineChart>
  );
}

export default Status;
