import React from 'react';

class Percentiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: [],

      candidate_id: this.props.candidates[0],
    };
    this.selectCandidate = this.selectCandidate.bind(this);
  }

  selectCandidate(e) {
    this.setState({
      candidate_id: parseInt(e.target.value, 10)
    })
  }


  fetchMovies = async () => {

    const response = await fetch('/movies');
    const { list } = await response.json();
    console.log(list)
    this.setState({
      movieData: list,

    })
  }

  render() {
    const {movieData} = this.state;
    console.log(movieData);
    return (
      <React.Fragment>
          <div className="controls">
              <input type="text" className="filter-input" data-testid="candidate-id"
                  onChange={this.selectCandidate}/>
          </div>

          <button onClick={(e) => {
                  e.preventDefault();
                  this.fetchMovies();
              }}> Search Movies
          </button>
          <ul className="results">
                  {movieData.map((movie, index) => {
                    return (
                      <li key={"title-" + index} data-testid="result-row">{movie.title} {movie.genres}</li>
                    )
                  })}
              </ul>
      </React.Fragment>
    );
  }
}

export default Percentiles;
