from flask import Flask, request
from flask_cors import CORS
import io
from stockfish import Stockfish
import chess
import chess.pgn


# declare variables
stockfish = Stockfish(
    path="./STOCKFISH/stockfish-windows-2022-x86-64-avx2.exe")
engine_analysis_time = 1000
board = chess.Board()

app = Flask(__name__)

CORS(app)


@app.post("/analyze")
def construct_game():

    game = {
        "uuid":"",
        "pgn": "",
        "moves_san": [],
        "moves_uci": [],
        "fen": ["rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"],
        "score": [],
        "bestmove": [],

    }

    # read the pgn sent by client
    incoming_data = request.get_json()
    uuid=incoming_data['uuid']
    pgn = incoming_data['pgn']
    history = incoming_data['history']

    # input pgn sent by client into the chess object
    gameFromPGN = chess.pgn.read_game(io.StringIO(pgn))

    # update the move and pgn inormation of the game dictionary
    game.update({"uuid":uuid})
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


    # create cp list
    cp=[]
    for score in game["score"]:
        if score["type"]=="cp":
           cp.append(score["value"])
        else:
            cp.append(10000000)
    
    # create cp_loss list
    # # subtract next element from previous element to find cp loss
    # if it is a large number or 0 it is a blunder or mate sequence
    cp_loss=[y - x for x, y in zip(cp[0:], cp[1:])]

    print(cp)
    print(cp_loss)

    # construct analysis dictionary
    analysis={}
    analysis["uuid"]=game["uuid"]
    print(analysis)

