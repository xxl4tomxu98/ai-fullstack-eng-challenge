import click
import flask
import pymysql

app = flask.Flask(__name__)
db = pymysql.connect(
    user="root",
    password="testpass",
    host="db",
    database="challenge",
)


@app.route("/test")
def test():
    with db.cursor() as cur:
        cur.execute("SELECT title, genres FROM movies;")
        movies = cur.fetchall()[:10]
        return flask.jsonify([dict(title=movie[0], genres=movie[1], backend="python") for movie in movies])


@app.cli.command("load-movielens")
def load_movielens():
    with db.cursor() as cur:
        cur.execute("SELECT col FROM test;")
        (result,) = cur.fetchone()
        click.echo(f"result {result}")
