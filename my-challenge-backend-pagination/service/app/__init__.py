from flask import Flask, jsonify, request
from .models import db, Movie, Tag, Rating, Link, MyJSONEncoder
from os import environ
from sqlalchemy import or_, String, Integer, desc
from sqlalchemy.sql.expression import cast

# use config class to connect sqlAlchemy to postgresql database
class Config:
    SQLALCHEMY_DATABASE_URI = environ.get("DATABASE_URL") or \
        "postgresql://root:testpass@localhost/challenge"
    SQLALCHEMY_TRACK_MODIFICATIONS = False


app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

with app.app_context():
    db.create_all()

app.json_encoder = MyJSONEncoder

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')


# This is a multi-purpose search engine that can return
# movies based on match on title, genres, or movie_id(return one)
@app.route('/search/<term>')
def search(term):
    #This one is if search term is input from page searchbar
    #key = request.get_json()["term"]
    # This pagination page is from url '/search/term?page=1'
    page = request.args.get('page', 1, type=int)
    search_args = [col.ilike('%%%s%%' % term) for col in
                   [Movie.title, Movie.genres, cast(Movie.movie_id, String)]]

    movies = Movie.query.filter(or_(*search_args)) \
                        .order_by(Movie.release_year.desc()) \
                        .paginate(page=page, per_page=5, error_out=True)

    return {'list': [movie.to_dict() for movie in movies.items],
            'pages': [page for page in movies.iter_pages()]}


@app.route('/movies')
def get_movies():
    page = request.args.get('page', 1, type=int)
    response = Movie.query.order_by(Movie.release_year.desc()) \
                          .paginate(page=page, per_page=5, error_out=True)
    return {'list': [film.to_dict() for film in response.items],
            'pages': [page for page in response.iter_pages()]}


@app.route('/tags')
def get_tags():
    page = request.args.get('page', 1, type=int)
    response = Tag.query.join(Movie) \
                        .order_by(Movie.release_year.desc()) \
                        .paginate(page=page, per_page=5, error_out=True)
    return {'list': [tag.to_dict() for tag in response.items],
            'pages': [page for page in response.iter_pages()]}


@app.route('/ratings')
def get_ratings():
    page = request.args.get('page', 1, type=int)
    response = Rating.query.paginate(page=page, per_page=5, error_out=True)
    return {'list': [rate.to_dict() for rate in response.items],
            'pages': [page for page in response.iter_pages()]}


@app.route('/links')
def get_links():
    page = request.args.get('page', 1, type=int)
    response = Link.query.paginate(page=page, per_page=5, error_out=True)
    return {'list': [link.to_dict() for link in response.items],
            'pages': [page for page in response.iter_pages()]}


@app.route('/movies/<id>')
def get_movie_from_id(id):
    movie = Movie.query.filter_by(movie_id=id).first()
    return {'movie': movie.to_dict()}


@app.route('/search/tags/<tag_content>')
def get_tagged_movies(tag_content):
    page = request.args.get('page', 1, type=int)
    search_args = [col.ilike('%%%s%%' % tag_content) for col in
                    [Tag.tag]]
    # tags = Tag.query.filter(or_(*search_args)).all()
    # response = [tag.movie_id for tag in tags]
    # all_movies = Movie.query.all()
    # results = [film for film in all_movies if film.movie_id in response]
    results = Movie.query.join(Tag)  \
                         .filter(or_(*search_args)) \
                         .order_by(Movie.release_year.desc()) \
                         .paginate(page=page, per_page=5, error_out=True)
    return {'list': [film.to_dict() for film in results.items],
            'pages': [page for page in results.iter_pages()]}


@app.route('/search/ratings/<target>')
def get_rated_movies(target):
    # obtain all ratings with value greater than limit
    # ratings = Rating.query.filter(Rating.rating == float(target)).all()
    # response = [rating.movie_id for rating in ratings]
    # all_movies = Movie.query.all()
    # results = [film for film in all_movies if film.movie_id in response]
    page = request.args.get('page', 1, type=int)
    results = Movie.query.join(Rating)  \
                         .filter(Rating.rating == float(target)) \
                         .order_by(Movie.release_year.desc()) \
                         .paginate(page=page, per_page=5, error_out=True)
    return {'list': [film.to_dict() for film in results.items],
            'pages': [page for page in results.iter_pages()]}


@app.route('/search/users/<int:id>')
def get_user_rated_tagged_movies(id):
    # obtain indexes of user tags and ratings
    # user_rates = Rating.query.filter(Rating.user_id == id).all()
    # user_tags = Tag.query.filter(Tag.user_id == id).all()
    # sum all movie rated or tagged by user remove duplicates
    # response = {*[rating.movie_id for rating in user_rates],
    #               *[tag.movie_id for tag in user_tags] }
    # all_movies = Movie.query.all()
    # results = [film for film in all_movies if film.movie_id in response]
    page = request.args.get('page', 1, type=int)
    # rating_results = Movie.query.join(Rating)  \
    #                      .filter(Rating.user_id == id).all()
    # tag_results = Movie.query.join(Tag)  \
    #                      .filter(Tag.user_id == id).all()
    # results = {*rating_results, *tag_results}
    results = Movie.query.join(Rating).filter(Rating.user_id == id) \
                         .order_by(Movie.release_year.desc()) \
                         .paginate(page=page, per_page=5, error_out=True)
    return {'list': [film.to_dict() for film in results.items],
            'pages': [page for page in results.iter_pages()]}
