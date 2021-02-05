import React, { Component } from 'react';
import './App.css';
import SearchDB from './components/SearchDB';

class App extends Component {
  render() {
    const term = '4000';
    return (
      <div className="App">
          <SearchDB term={term}/>
      </div>
    );
  }
}

export default App;
