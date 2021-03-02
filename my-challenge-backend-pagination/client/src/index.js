import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


//const term = "3000";

try {
    ReactDOM.render(<App />, document.getElementById('root'));
}
catch(error) {
    console.error('Unknown error intercepted. error: ', error);
}
registerServiceWorker();
