import React from 'react';
import { render } from 'react-dom';
// import PropTypes from 'prop-types';
import { appState } from '../../react_views/appState';


export default class Loader extends React.Component{

    render(){
        return (
        <div id="full-page-loader" className={`loader-container ${this.props.hide? '' : 'loading drop-in'}`}>
            <div className="loader-drop">
                <span className="loader-text">Pondlebob</span>
            </div>
        </div>
        )
    }
}


