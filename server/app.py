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
board = chess.Board()

app = Flask(__name__)

CORS(app)


@app.post("/analyze")
def construct_game():

    game = {
        "pgn": "",
        "moves_san": [],
        "moves_uci": [],
        "fen": ["rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"],
        "score": [],
        "bestmove": [],

    }

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

    # print(game)
    analyze_game(game)

    return "got pgn", 200


def analyze_game(game):

    # starting_position = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

    # stockfish.set_fen_position(
    #     "rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2")

    # board.reset()
    for fen in game["fen"]:
        # board.legal_moves
        stockfish.set_fen_position(fen)
        bestmove = stockfish.get_best_move_time(engine_analysis_time)
        game["bestmove"].append(bestmove)
        # score = stockfish.get_evaluation()["value"]
        # game["score"].append(score/100)
        score = stockfish.get_evaluation()
        game["score"].append(score)

    print(game)
    # create cp_lost list

    # print(game["score"])
    # # subtract next element from previous element to find cp loss
    # print([y - x for x, y in zip(game["score"], game["score"][1:])])

    # print(game)
