import React from 'react';
import ReactDOM from 'react-dom';
import App from './react_views/App.js';
import { lazyStyles } from './utils/utilities';




ReactDOM.render(<App/>, document.getElementById('root'));
document.addEventListener('DOMContentLoaded', function(){
    lazyStyles($('[data-lazy-style="bootstrap"]'), true);
})

