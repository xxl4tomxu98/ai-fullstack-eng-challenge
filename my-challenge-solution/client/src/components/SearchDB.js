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
    };

  }

  updateTerm = (e) => {
    this.setState({
      term: e.target.value,
    })
  }

  updateTagTerm = (e) => {
    this.setState({
      tag_content: e.target.value,
    })
  }

  handleClick = (e) => {
    this.setState({
      currentPage: Number(e.target.innerHTML),
    });
  }

  // fetchMovies = async () => {
  //   const response = await fetch('/movies');
  //   const { list } = await response.json();
  //   console.log(list)
  //   this.setState({
  //     movieData: list,
  //   })
  // }

  searchMovies = async () => {
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

  searchMoviesByTag = async () => {
    const term = this.state.tag_content;
    const res = await fetch(`/search/movies/${term}`)
    if (res.ok) {
        const { results } = await res.json();
        console.log(results)
        this.setState({
          movieData: results,
        })
        return results;
    }
    throw res;
  }

  render() {
    const { movieData, currentPage } = this.state;
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
          <h2>Hello, My Movielens Challenge.</h2>
          <div style={divStyle}>
              <div>
                  <input type="text" className="filter-input" data-testid="term-id"
                      onChange={this.updateTerm}/>
                  <button onClick={(e) => {
                          e.preventDefault();
                          this.searchMovies();
                      }}> By Title, Genres, or Movie_Id
                  </button>
              </div>

              <div>
                  <input type="text" className="filter-input" data-testid="tagTerm-id"
                      onChange={this.updateTagTerm}/>
                  <button onClick={(e) => {
                          e.preventDefault();
                          this.searchMoviesByTag();
                      }}> By Tag Content
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
                      <li>Genres: {movie.genres.join(" | ")}</li>
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
