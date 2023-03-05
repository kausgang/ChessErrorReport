import copy from "copy-to-clipboard";

export const saveGame = (pgn) => {
  console.log(pgn);
  copy(pgn);
  alert("Game Copied to Clipboard");
};
