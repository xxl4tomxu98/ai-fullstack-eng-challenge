import csv
import psycopg2
conn = psycopg2.connect("host=localhost dbname=challenge user=root password=testpass")
cur = conn.cursor()
cur.execute("""
    CREATE TABLE movies(
     movie_id INTEGER NOT NULL PRIMARY KEY
    ,title VARCHAR(255) NOT NULL
    ,genres VARCHAR(255) NOT NULL
);
""")

with open('movies.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader) # Skip the header row.
    for row in reader:
        cur.execute(
        "INSERT INTO movies VALUES (%s, %s, %s)",
        row
    )



cur.execute("""
    CREATE TABLE tags(
       id SERIAL PRIMARY KEY
      ,user_id INTEGER
      ,movie_id INTEGER
      ,tag VARCHAR(255)
      ,timestamp INTEGER
      ,FOREIGN KEY(movie_id) REFERENCES movies(movie_id)
);
""")

with open('tags.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader) # Skip the header row.
    for row in reader:
        cur.copy_from(f, 'tags', sep=',', null="",
                      columns=['user_id', 'movie_id',
                      'tag', 'timestamp'])

cur.execute("""
    CREATE TABLE ratings(
       id SERIAL PRIMARY KEY
      ,user_id INTEGER
      ,movie_id INTEGER
      ,rating DECIMAL(2,1)
      ,timestamp INTEGER
      ,FOREIGN KEY(movie_id) REFERENCES movies(movie_id)
);
""")

with open('ratings.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader) # Skip the header row.
    for row in reader:
        cur.copy_from(f, 'ratings', sep=',', null="",
                      columns=['user_id', 'movie_id',
                      'rating', 'timestamp'])


cur.execute("""
    CREATE TABLE links(
       id SERIAL PRIMARY KEY
      ,movie_id INTEGER
      ,imdb_id  INTEGER
      ,tmdb_id  INTEGER
      ,FOREIGN KEY(movie_id) REFERENCES movies(movie_id)
);
""")

with open('links.csv', 'r') as f:
    reader = csv.reader(f)
    # next(reader) # Skip the header row.
    for row in reader:
        cur.copy_from(f, 'links', sep=',', null="",
                       columns=['movie_id', 'imdb_id',
                                 'tmdb_id'])

conn.commit()
# cur.execute('SELECT * FROM companies')
# one = cur.fetchone()
# all = cur.fetchall()
