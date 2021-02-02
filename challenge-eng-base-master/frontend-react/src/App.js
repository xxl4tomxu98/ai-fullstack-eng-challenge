//import React, { Component } from 'react';
import React, { useState, useEffect } from 'react';

const App = () => {

    const [term, setTerm] = useState('');
    const [movies, setMovies] = useState([]);

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

    const fetchMovies = async () => {
        const res = await fetch('/test')
        if (res.ok) {
            const data = await res.json();
            setMovies(data);
            return data;
        }
        throw res;
    }

    useEffect(() => {
        fetchMovies();
    }, []);


    return (
        <div>
          <h1>Hello, This Full Stack AI Challenge.</h1>
          <pre>state = {JSON.stringify(movies, undefined, '  ')}</pre>
        </div>
    );


}

export default App;
