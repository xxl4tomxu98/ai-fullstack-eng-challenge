from flask import Flask, jsonify
from .models import db, Movie, Tag, Rating, Link, MyJSONEncoder
from os import environ
from sqlalchemy import or_

# use config class to connect sqlAlchemy to postgresql database
class Config:
    SQLALCHEMY_DATABASE_URI = environ.get("DATABASE_URL") or \
        "postgresql://root:testpass@localhost/challenge"
    SQLALCHEMY_TRACK_MODIFICATIONS = False


app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
app.json_encoder = MyJSONEncoder

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')


# test route
@app.route('/')
def hello():
    return "Hello World!"


# Route endpoint for frontend React to call
@app.route('/search/<term>')
def search(term):
    #key = request.get_json()["term"]
    # search if term in title or genres of movies
    search_args = [col.ilike('%%%s%%' % term) for col in
                   [Movie.title, Movie.genres]]

    movies = Movie.query.filter(or_(*search_args)).all()
    print(movies)
    return {'list': [movie.to_dict() for movie in movies]}


@app.route('/movies')
def get_movies():
    response = Movie.query.all()[:10]
    return {'list': [film.to_dict() for film in response]}


@app.route('/tags')
def get_tags():
    response = Tag.query.all()[:10]
    return {'list': [tag.to_dict() for tag in response]}


@app.route('/ratings')
def get_ratings():
    response = Rating.query.all()[:10]
    return {'list': [rate.to_dict() for rate in response]}


@app.route('/links')
def get_links():
    response = Link.query.all()[:10]
    return {'list': [link.to_dict() for link in response]}
