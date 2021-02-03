import React, { useState, useEffect } from 'react';
import { ReactComponent as Search } from './Search.svg';

const App = () => {

    const [term, setTerm] = useState('movie');
    const [movieData, setMovieData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(3);

    const updateTerm = (e) => {
      setTerm(e.target.value);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      searchMovies(term);
    }

    const searchMovies = async (term) => {
        const res = await fetch(`/search/${term}`)
        if (res.ok) {
            const data = await res.json();
            setMovieData(data);
            return data;
        }
        throw res;
    }


    const fetchMovieData = async () => {
      const res = await fetch('/test')
        if (res.ok) {
            const data = await res.json();
            setMovieData(data);
            return data;
        }
        throw res;
    }

    const handleClick = (e) => {
        setCurrentPage(Number(e.target.innerHTML));
    }

    useEffect(() => {
        //fetchMovieData();
        searchMovies("movie");
    }, [term]);

    // sort searched movies by release_year desc
    movieData.sort(function(a, b) {
      const keyA = a.released;
      const keyB = b.released;
      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
    });
    // Logic for displaying pagination
    const indexOfLastPage = currentPage * perPage;
    const indexOfFirstPage = indexOfLastPage - perPage;
    const currentMovies = movieData.slice(indexOfFirstPage, indexOfLastPage);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(movieData.length / perPage); i++) {
        pageNumbers.push(i);
    }


    return (
        <div className="App">
          <h1>Hello, My Full Stack Challenge.</h1>
          <form onSubmit={handleSubmit} className="grid--cell fl-grow1 searchbar px12 js-searchbar " autoComplete="off">
              <div className="ps-relative">
                  <input
                    onChange={updateTerm}
                    type="text"
                    name="search"
                    value={term}
                    maxLength="200"
                    placeholder="Search Posts"
                    className="s-input s-input__search js-search-field "
                  />
                  <input type="submit" value="" style={{display: 'none'}} />

                  <Search/>
              </div>
          </form>
          <div>
              <div className="pagination">
                  {pageNumbers.fill().map((number, index) =>   {
                    return (
                      <button data-testid="page-button" key={"page-button-" + index} onClick={handleClick}>{index+1}</button>
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
          </div>

          <pre>{JSON.stringify(movieData, undefined, '  ')}</pre>

        </div>
    );


}

export default App;
