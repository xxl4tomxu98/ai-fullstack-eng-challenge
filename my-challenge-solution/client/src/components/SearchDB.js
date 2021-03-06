import React from 'react';

const divStyle = {
  display: 'flex',
  alignItems: 'center'
};

class SearchDB extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: [],
      currentPage: 1,
      term: 'movie',
      tag_content: '',
      rating_target: 0,
      user_id: 1,
    };

  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }


  handleClick = (e) => {
    this.setState({
      currentPage: Number(e.target.innerHTML),
    });
  }

  fetchMovies = async (url) => {
    const res = await fetch(url);
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

  searchMovies = () => {
    const { term } = this.state;
    const url = `/search/${term}`;
    this.fetchMovies(url);
  }

  searchMoviesByTag = () => {
    const { tag_content }= this.state;
    const url = `/search/tags/${tag_content}`;
    this.fetchMovies(url);
  }

  searchMoviesByRating = () => {
    const { rating_target } = this.state;
    const url = `/search/ratings/${rating_target}`;
    this.fetchMovies(url);
  }

  searchMoviesByUserId = () => {
    const { user_id } = this.state;
    const url = `/search/users/${user_id}`;
    this.fetchMovies(url);
  }


  fetchMoviesTest = (term) => {
      // This term is from props in from App() for testing
      const url = `/search/${term}`;
      this.fetchMovies(url);
  }

  componentDidMount() {
      const {term} = this.props;
      this.fetchMoviesTest(term);
  }

//   componentDidUpdate(oldProps) {
//       const oldTerm = oldProps.term;
//       const newTerm = this.props.term;
//       console.log(oldTerm, newTerm)
//       if (oldTerm === newTerm) {
//         return;
//       }
//       this.fetchMoviesTest(newTerm);
//   }

  render() {
    const { movieData, currentPage } = this.state;
    if(!movieData || movieData.length === 0) {
      return <h3>No Movies Returned, Check Input, Refresh to Retry.</h3>
    }
    // sort searched movies by release_year desc
    movieData.sort(function(a, b) {
      const keyA = parseInt(a.release_year, 10);
      const keyB = parseInt(b.release_year, 10);
      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
    });
    // Logic for displaying pagination
    const perPage = 3;
    const indexOfLastPage = currentPage * perPage;
    const indexOfFirstPage = indexOfLastPage - perPage;
    const currentMovies = movieData.slice(indexOfFirstPage, indexOfLastPage);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(movieData.length / perPage); i++) {
        pageNumbers.push(i);
    }
    return (
      <React.Fragment>
          <h2 data-testid="app-title">Hello, My Movielens Challenge.</h2>
          <div style={divStyle}>
              <div>
                  <input type="text" className="filter-input" data-testid="term-id"
                      name='term' onChange={this.onChange}/>
                  <button onClick={(e) => {
                          e.preventDefault();
                          this.searchMovies();
                      }}> Title |Genres |Movie_Id
                  </button>
              </div>

              <div>
                  <input type="text" className="filter-input" data-testid="tagTerm-id"
                      name='tag_content' onChange={this.onChange}/>
                  <button onClick={(e) => {
                          e.preventDefault();
                          this.searchMoviesByTag();
                      }}> Tag Content
                  </button>
              </div>

              <div>
                  <input type="text" className="filter-input" data-testid="ratingTerm-id"
                      name='rating_target' onChange={this.onChange}/>
                  <button onClick={(e) => {
                          e.preventDefault();
                          this.searchMoviesByRating();
                      }}> By Rating # (float)
                  </button>
              </div>

              <div>
                  <input type="text" className="filter-input" data-testid="userTerm-id"
                      name='user_id' onChange={this.onChange}/>
                  <button onClick={(e) => {
                          e.preventDefault();
                          this.searchMoviesByUserId();
                      }}> Rated or Tagged User
                  </button>
              </div>

          </div>
          <div className="pagination">
              {pageNumbers.fill().map((number, index) =>   {
                return (
                  <button data-testid="page-button" key={"page-button-" + index} onClick={this.handleClick}>{index+1}</button>
                )
              })}
          </div>

          <ul className="results">
              {currentMovies.map((movie, index) => {
                return (
                  <div data-testid="result-row" key={"result-" + index}>
                      <a href={`https://movielens.org/movies/${movie.movie_id}`}>{movie.title}</a><a href={`http://www.imdb.com/title/${movie.imdb_tmdb[0]}`} style={{paddingLeft: '4px'}}>imdb</a><a href={`https://www.themoviedb.org/movie/${movie.imdb_tmdb[1]}`} style={{paddingLeft: '4px'}}>tmdb</a>
                      <li>Id: {movie.movie_id}    Genres: {movie.genres.join(" | ")}</li>
                      <li>Num_of_Tags: {movie.tag_count}       Tags: {movie.all_tags.join(' | ')}</li>
                      <li>Num_of_Ratings: {movie.rating_count}    Average Rating: {movie.avg_rating}</li>
                  </div>
                )
              })}
          </ul>
      </React.Fragment>
    );
  }
}

export default SearchDB;
