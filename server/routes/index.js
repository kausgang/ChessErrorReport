var express = require("express");
var router = express.Router();

// let arr = [];

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render('index', { title: 'Express' });

  let engine = req.app.locals.engine;
  let fen = "rnbqkbnr/pp2pppp/3p4/2pP4/2P5/8/PP2PPPP/RNBQKBNR b KQkq - 0 3";

  let depth = 10;
  engine.postMessage("position fen " + fen);
  engine.postMessage("go depth " + depth);

  engine.onmessage = function (line) {
    console.log(line);

    let last_line = line.match("info depth " + depth);
    let best_move = line.match(/bestmove\s+(\S+)/);
    if (last_line) console.log(last_line);
    if (best_move) console.log(best_move[1]);

    // res.status(200).send({});
  };
});

module.exports = router;
