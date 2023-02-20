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
function App() {
  return <button onClick={test_click}>test</button>;
}

export default App;
