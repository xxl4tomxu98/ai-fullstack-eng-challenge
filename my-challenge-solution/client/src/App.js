import React, { Component } from 'react';
import './App.css';
import SearchDB from './components/SearchDB';

class App extends Component {
  render() {
    const { candidates } = this.props;
    return (
      <div className="App">
          <SearchDB candidates={candidates}/>
      </div>
    );
  }
}

export default App;
