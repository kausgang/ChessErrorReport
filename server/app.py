from flask import Flask, request
from flask_cors import CORS
import io
from stockfish import Stockfish
import chess
import chess.pgn

app = Flask(__name__)

CORS(app)

stockfish = Stockfish(
    path="./STOCKFISH/stockfish-windows-2022-x86-64-avx2.exe")


@app.post("/analyze")
def analyze_game():
    pgn_json = request.get_json()
    pgn = pgn_json['pgn']

    # print(pgn)
    game = chess.pgn.read_game(io.StringIO(pgn))
    # print(game)
    pgn_board = game.board()

    board = chess.Board()

    for move in game.mainline_moves():
        print(move)

    # print(board.legal_moves )
    return "got pgn", 200
