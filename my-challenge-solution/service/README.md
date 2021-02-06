## Backend Setup and Process
- The four data csv files are converted to sql database tables that will seed data from the csv files into the database tables

  -- Database postgresql named "challenge" were created with owner "root" and password "testpass".

     ```create user root with password 'password' superuser; ```

     ```create database challenge with owner root; ```

  -- Within the service folder run

     ```pipenv shell

        python import_data.py
     ```

  -- Type of columns were specifically given, and PRIMARY KEYS and FOREIGN KEYS are defined.
  -- The movie_id is PK for movies table and FK for the other three tables


## Flask App
- Since the tables are relational even though only four are present, For the sake of better query backend Flask sever are built to connect to the database using database handler psycopg2-binary and ORM SqlAlchemy to help fetching data as needed.

- .env and .flaskenv were created for environmental variables and entrypoint folder/files specification

- Model schema were created with SqlAlchemy model against DB in file models.py

  --class functions were built especially around movies table to help facilitate querying in sqlAlchemy.

  --relationships based on foreign key were created to do this last step.

  --there is an extra many to many table "movies_tags" relationship built for the sake of if user wants to add more tags to movies and is NOT used in this query excercise.

  --to_dict functions were built to facilitate sending JSON to frontend. But need "MyJSONEncoder" class to help encoding problems with columns of Numeric values.

  --I could draw a model schema on a chart to show relationships but believe this is not necessary since the schema is straightforward based table relations.

- In the file init.py within app folder the library dependencies were imported, connection to DB were setup and     initial flask app initiated. Please see detailed comments in the files for further reference.

- First, a Hello World index page were tested to see if Flask app works. it is on ```http://localhost:5000/```

- Then endpoint of routes for database query and filtering and calculations are carried out with helper functions.

- All the endpoints have been tested on backend browser ```http://localhost:5000/``` for all movies, tags, ratings, links queries.

- Movie query based on specific movie_id are also tested in the backend and worked well.

- Searches on movies based on movies column names, or tag, rating, and user filters are all tested successfully in the backend.

- For example, the output of the search json for movie_id=3000 on port 5000 are tested to work. ```http://localhost:5000/movies/3000```

  -- pipenv were were used to create isolated environment in service

  ``` pipenv install``` will install dependencies in the Pipfile

  ``` pipenv shell``` will activate the shell, then

  ``` flask run ``` will run the flask app

## Fronend React App

- ```npm install``` will install dependencies

- ```npm start``` will run the react app

- key Ajax code that fetch flask endpoint json dataset can be seen as below:
``` searchMovies = async () => {
    const term = this.state.term;
    const res = await fetch(`/search/${term}`)
    if (res.ok) {
        const { list } = await res.json();
        console.log(list)
        this.setState({
          movieData: list,
        })
        return list;
    }
    throw res;
  }
```
- UI design is such that all four major fronend queries are listed side by side horizontally to save space.

- Four forms and buttons were created to do:

  -- general movies table search based on "keywords" of movies columns, e.g. "title", "genres", "movie_id". One can input any one of the three search terms and get the matches from movies table based on the terms.

  -- search of movies table based on filters in tag column of the tags table. Input should be possible tag in tag column of tags table, e.g. most likely actors names.

  -- search of movies table based on filters in rating column of the ratings table. Input should be possible rating (0.5 increments) in rating column of ratings table, e.g. 0.5, 1.0, 1.5 ...

  -- search of movies based on whether a certain user_id has rated or tagged the movies. Input shall be user_id and rows in tags and ratings tables were searched to get all possible movies and eliminte duplicates.

- Paginations are designed in component "SearchDB.js" so that buttons of all possible pages are listed in the page and each page contains 3 movies due to limitations on space each page. The data were sorted starting most recent released movies first and going back in years.

- Each movie rendering contains movie_id, title with links to movielens url, and links to other two database urls, imdb and tmdb.

- total tag number for each movie and the tags

- total number of times it is rated and average rating for the movie

# Cross Origin Resourse Sharing
- CORS issue has to be addressed because I am rendering on port 8000 from data from port 5000
  -- the code to prevent CORS porblem is to have the following proxy declaration in client/package.json.

  ``` "proxy": "http://localhost:5000" ```


# Test React
- A prelimnary test skeleton was started and unfortunately I could not finish that on time. I have set up testIds object where data-testid locations can be sepecified for DOM rendering testing. for instance, pages and movies in the array rendering, and some other elements.

- The index.js, App.js, and SearchDB.js files are added props where initial input search terms can be passed along to the child components so that when test program runs it can send in custom term.

- The componentDidMount() and componentDidUpdate() life cycle functions were used for initial DOM handling on default search term and for testing when search term changes.

- The react test run can do reasonably well with artificial simple components I tested. Not this App with SearchDB.

- The tests logic and methodology scheme were planned. Encountered a lot of network connection and other issues with jest and react test library. The search term seems to come in the App component, but test has not been able to return DOM elements based on the mock and render activities. Further research into this is needed.

# Container based method were attmepted initially with some difficulty in importing data. But implemented raw SQL lines for querying on the movies successfully.
