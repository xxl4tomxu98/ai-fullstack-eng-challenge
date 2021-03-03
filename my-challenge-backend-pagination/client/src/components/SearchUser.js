import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const divStyle = {
    display: 'flex',
    alignItems: 'center'
};

const SearchUser = () => {
    const [totalPages, setTotalPages] = useState(0);
    const [movieData, setMovieData] = useState([]);
    const [userId, setUserId] = useState(1);

    const link = `/search/users/${userId}?page=`;

    const onChange = (e) => {
        const { value } = e.target;
        setUserId(value);
    }


    const handleClick = (e) => {
        let targetBtn = Number(e.target.innerHTML);
        fetchMovies(targetBtn);
    }

    const fetchMovies = async (page) => {
        const url = link + page;
        const res = await fetch(url);
        const { list, pages } = await res.json();
        console.log(list, pages);
        setTotalPages(pages);
        setMovieData(list);
    }



    useEffect(() => {
        fetchMovies(1);
    }, [])


    if(!movieData || movieData.length === 0) {
        return <h3>No Movies Returned, Check Input, Refresh to Retry.</h3>
    }


    return (
      <React.Fragment>
          <h2 data-testid="app-title">Hello, My Movielens Challenge.</h2>
          <div style={divStyle}>
              <div>
                  <input type="text" className="filter-input" data-testid="userTerm-id"
                      name='userId' value={userId} onChange={onChange}/>
                  <button onClick={(e) => {
                          e.preventDefault();
                          fetchMovies(1);
                      }}> Rated or Tagged User
                  </button>
                  <Link to='/'>
                      <button type='button' className='s-btn s-btn__filled' style={{paddingLeft: '8px'}}>Return to HomePage</button>
                  </Link>
              </div>
          </div>
          <br/>
          <div className="pagination">
              {totalPages.map((number, index) =>   {
                  return ( number===null ?
                    <button data-testid="page-button" key={"page-button-" + index}>...</button>
                   :
                    <button data-testid="page-button" key={"page-button-" + index} onClick={handleClick}>{`${number}`}</button>
                  )
              })}
          </div>

          <ul className="results">
              {movieData.map((movie, index) => {
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

export default SearchUser;
