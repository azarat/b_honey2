import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppGrid from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<AppGrid />, document.querySelector('#app'));

serviceWorker.unregister();
