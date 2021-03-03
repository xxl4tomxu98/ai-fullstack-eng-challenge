import React from 'react';
import './App.css';
import SearchKeyword from './components/SearchKeyword';
import SearchTag from './components/SearchTag';
import SearchRating from './components/SearchRating';
import SearchUser from './components/SearchUser';
import HomePage from './components/HomePage';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

const App = () => {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/search/:term' component={SearchKeyword} />
                    <Route exact path='/search/tags/:tagTerm' component={SearchTag} />
                    <Route exact path='/search/ratings/:ratingTerm' component={SearchRating} />
                    <Route exact path='/search/users/:userId' component={SearchUser} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
