from flask import Flask, render_template, request, redirect, session
import sqlite3

app = Flask(__name__)
app.secret_key = "basketcloud"

def db():
    return sqlite3.connect("database.db")

conn = db()
conn.execute("CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, user TEXT, pass TEXT)")
conn.close()


@app.route("/", methods=["GET","POST"])
def login():

    if request.method == "POST":

        user = request.form["user"]
        password = request.form["pass"]

        conn = db()

        data = conn.execute(
        "SELECT * FROM users WHERE user=? AND pass=?",
        (user,password)).fetchone()

        if data:
            session["user"] = user
            return redirect("/game")

    return render_template("login.html")


@app.route("/register", methods=["GET","POST"])
def register():

    if request.method == "POST":

        user = request.form["user"]
        password = request.form["pass"]

        conn = db()
        conn.execute("INSERT INTO users(user,pass) VALUES(?,?)",(user,password))
        conn.commit()

        return redirect("/")

    return render_template("register.html")


@app.route("/game")
def game():

    if "user" not in session:
        return redirect("/")

    return render_template("game.html")


app.run(host="0.0.0.0",port=5000)