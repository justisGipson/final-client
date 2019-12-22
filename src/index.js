import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import http from 'http';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@material/icon-button';

setInterval(function() {
    http.get('http://jg-gear-locker.herokuapp.com')
}, 30000) // wake every 5 minutes

ReactDOM.render(<App />, document.getElementById('root'));
