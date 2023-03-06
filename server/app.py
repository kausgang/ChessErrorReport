from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app)






@app.post("/analyze")
def analyze_game():
    print(request.get_json())
    return "got pgn" , 200