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
        return flask.jsonify([dict(title=movie[0], genres=genres_array(movie[1]),
                                   released=release_year(movie[0])) for movie in movies])


@app.cli.command("load-movielens")
def load_movielens():
    with db.cursor() as cur:
        cur.execute("SELECT col FROM test;")
        (result,) = cur.fetchone()
        click.echo(f"result {result}")


def genres_array(str):
    if str.find('|') == -1:
        return [str]
    return str.split('|')


def release_year(str):
    return int(str[-5:-1])
