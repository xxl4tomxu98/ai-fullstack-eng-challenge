//import React, { Component } from 'react';
import React, { useState, useEffect } from 'react';


const App = () => {

    const [term, setTerm] = useState('');
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
            return data;
        }
        throw res;
    }


    const fetchMovieData = async () => {
      const res = await fetch('/test')
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            setMovieData(data);
            return data;
        }
        throw res;
    }

    const handleClick = (e) => {
      setCurrentPage(Number(e.target.id));
    }

    useEffect(() => {
        fetchMovieData();
    }, []);

    // Logic for displaying pagination
    const indexOfLastPage = currentPage * perPage;
    const indexOfFirstPage = indexOfLastPage - perPage;
    const currentMovies = movieData.slice(indexOfFirstPage, indexOfLastPage);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(movieData.length / perPage); i++) {
        pageNumbers.push(i);
    }


    return (
        <div>
          <h1>Hello, This Full Stack AI Challenge.</h1>

          <div>
              <ul>
                  {currentMovies.map((movie, index) => (
                      <li key={index}>{movie.title}</li>
                  ))};
              </ul>
              <ul id="page-numbers">
                  {pageNumbers.map(number => {
                      return (
                        <li
                          key={number}
                          id={number}
                          onClick={handleClick}
                        >
                          {number}
                        </li>
                        );
                  })};
              </ul>
          </div>

          <pre>{JSON.stringify(movieData, undefined, '  ')}</pre>

        </div>
    );


}

export default App;
