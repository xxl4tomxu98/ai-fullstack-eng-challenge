import React, { Component } from 'react';
import './App.css';
import SearchDB from './components/SearchDB';

class App extends Component {
  render() {

    return (
      <div className="App">
          <SearchDB />
      </div>
    );
  }
}

export default App;
