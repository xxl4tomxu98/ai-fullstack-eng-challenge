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
        # cur.execute("SELECT title, genres FROM movies;")
        # movies = cur.fetchall()[:20]
        # data = [dict(title=movie[0], genres=genres_array(movie[1]),
        #                            released=release_year(movie[0]))
        #                            for movie in movies]

        cur.execute("SELECT userId, movieId, tag FROM tags;")
        tags = cur.fetchall()[:20]
        data = [dict(userId=tag[0], movieId=tag[1],
                    tagText=tag[2]) for tag in tags]

        # cur.execute("SELECT userId, movieId, rating FROM ratings;")
        # ratings = cur.fetchall()[:20]
        # data = [dict(userId=rating[0], movieId=rating[1],
        #             ratingValue=rating[2]) for rating in ratings]

        # cur.execute("SELECT movieId, imdbId, tmdbId FROM links;")
        # links = cur.fetchall()[:20]
        # data = [dict(movieId=link[0], imdbId=link[1],
        #             tmdbId=link[2],) for link in links]
        return flask.jsonify(data)


@app.route("/search/<term>")
def search(term):
    with db.cursor() as cur:
        cur.execute("""SELECT title, genres FROM movies
                      WHERE title LIKE %(filter)s or genres LIKE %(filter)s
                      ;""", {'filter': f"{term}%"})

        movies = cur.fetchall()
        data = [dict(title=movie[0], genres=genres_array(movie[1]),
                                   released=release_year(movie[0]))
                                   for movie in movies]
        return flask.jsonify(data)


# @app.route("/filter")
# def filter():
#     with db.cursor() as cur:
#         cur.execute("SELECT title, genres FROM movies;")

#         movies = cur.fetchall()[:20]
#         data = [dict(title=movie[0], genres=genres_array(movie[1]),
#                                    released=release_year(movie[0]))
#                                    for movie in movies]
#         return flask.jsonify(data)


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
