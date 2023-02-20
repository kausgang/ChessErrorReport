import logo from "./logo.svg";
import "./App.css";

import axios from "axios";

const test_click = () => {
  // alert("test");
  axios
    .get("http://localhost:4000/")
    .then((res) => {
      console.log(res);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
};

var engine = new Worker("stockfish.js");

function App() {
  // var stockfish1 = stockfish();
  let fen = "rnbqkbnr/pp2pppp/3p4/2pP4/2P5/8/PP2PPPP/RNBQKBNR b KQkq - 0 3";

  let depth = 10;
  engine.postMessage("position fen " + fen);
  engine.postMessage("go depth " + depth);

  engine.onmessage = function (line) {
    // console.log(line.data);

    let last_line = line.data.match("info depth " + depth);
    let best_move = line.data.match(/bestmove\s+(\S+)/);
    if (last_line) console.log(last_line);
    if (best_move) console.log(best_move[1]);
  };
  return (
    <>
      <button onClick={test_click}>test</button>
    </>
  );
}

export default App;
