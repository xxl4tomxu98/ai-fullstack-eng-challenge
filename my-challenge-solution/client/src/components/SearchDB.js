import React from 'react';

class SearchDB extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: [],
      currentPage: 1,
      term: 'movie',
    };

  }

  updateTerm = (e) => {
    this.setState({
      term: e.target.value,
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

  render() {
    const { movieData, currentPage } = this.state;
    // sort searched movies by release_year desc
    movieData.sort(function(a, b) {
      const keyA = a.release_year;
      const keyB = b.release_year;
      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
    });
    // Logic for displaying pagination
    const perPage = 5;
    const indexOfLastPage = currentPage * perPage;
    const indexOfFirstPage = indexOfLastPage - perPage;
    const currentMovies = movieData.slice(indexOfFirstPage, indexOfLastPage);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(movieData.length / perPage); i++) {
        pageNumbers.push(i);
    }
    return (
      <React.Fragment>
          <h1>Hello, My Movielens Challenge.</h1>
          <div className="controls">
              <input type="text" className="filter-input" data-testid="candidate-id"
                  onChange={this.updateTerm}/>
          </div>

          <button onClick={(e) => {
                  e.preventDefault();
                  this.searchMovies();
              }}> Search Movies
          </button>
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
                  <li key={"title-" + index} data-testid="result-row">{movie.title} {movie.genres}</li>
                )
              })}
          </ul>
      </React.Fragment>
    );
  }
}

export default SearchDB;
