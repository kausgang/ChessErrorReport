var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render('index', { title: 'Express' });

  let engine = req.app.locals.engine;
  let fen = "rnbqkbnr/pp2pppp/3p4/2pP4/2P5/8/PP2PPPP/RNBQKBNR b KQkq - 0 3";

  engine.postMessage("position fen " + fen);
  engine.postMessage("go depth 5");

  engine.onmessage = function (line) {
    console.log(line);
  };

  res.status(200).send({ a: "A" });
});

module.exports = router;
