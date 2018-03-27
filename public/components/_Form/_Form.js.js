/**
 * Created by root on 7/7/17.
 */
//dependencies
import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';




export default class Form extends React.Component{
    constructor(props){
        super(props);


    }


    render(){

        return(
          <form name={this.props.formName}
                method={this.props.formMethod}
                action={this.props.formAction}
          >
              {this.props.children}
          </form>
        );
    }
}