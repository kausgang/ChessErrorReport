from flask import Flask, request
from flask_cors import CORS
import io
from stockfish import Stockfish
import chess
import chess.pgn

# declare variables
stockfish = Stockfish(
    path="./STOCKFISH/stockfish-windows-2022-x86-64-avx2.exe")
engine_analysis_time = 5000


app = Flask(__name__)

CORS(app)


@app.post("/analyze")
def construct_game():

    game = {
        "pgn": "",
        "moves_san": [],
        "moves_uci": [],
        "fen": [],
        "score": [],
        "bestmove": [],
        "bestmove_score": [],
    }

    board = chess.Board()

    # read the pgn sent by client
    pgn_json = request.get_json()
    pgn = pgn_json['pgn']
    history = pgn_json['history']

    # input pgn sent by client into the chess object
    gameFromPGN = chess.pgn.read_game(io.StringIO(pgn))

    # update the move and pgn inormation of the game dictionary
    game.update({"pgn": pgn})
    game.update({"moves_san": history})

    # get details about the game from pgn file
    for move in gameFromPGN.mainline_moves():

        # make the move
        board.push(move)
        # update game objects's fen and moves_uci list

        game["fen"].append(board.fen())
        game["moves_uci"].append(move.uci())

    analyze_game(game)

    return "got pgn", 200


def analyze_game(game):

    starting_position = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

    # stockfish.set_fen_position(
    #     "rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2")

    for fen in game["fen"]:
        stockfish.set_fen_position(fen)
        bestmove = stockfish.get_best_move_time(engine_analysis_time)
        # print(bestmove)

    # print(stockfish.get_best_move())
