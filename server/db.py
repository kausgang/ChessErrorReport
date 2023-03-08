from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

import sqlite3
con = sqlite3.connect("tutorial.db")