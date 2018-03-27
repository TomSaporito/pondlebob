/**
 * Created by root on 6/22/17.
 */
import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

//import custom components
import InputError from '../_InputError/_InputError.js';

/*
REQUIRED
    @prop name          {string}        name of select and id
    @prop controlFunc   {function}      function for the change handler
    @prop label         {string}        text in label
    @prop inputType     {string}        type of input
    @prop value         {string|number} the value of the input

OPTIONAL
    @prop validateFunction  {function}  function to hit when on blur is triggered
    @prop required          {boolean}   is input required
    @prop labelAfter        {boolean}   should label be after the input
    @prop placeholder       {string}    placeholder text
    @prop valid             {boolean}   is the input valid
*/


class SingleInput extends React.Component{
    constructor(props){
        super(props);
    }

    renderLabel(){
        return (
            <label htmlFor={this.props.name}>
                {this.props.label}
            </label>
        );
    }



    render(){



        return(
          <div className={'form-group '+  (this.props.touched === true && this.props.valid === false? 'has-error' : '')}>


              {this.props.labelAfter? null : this.renderLabel()}
              <input
                  className="form-control"
                  name={this.props.name}
                  type={this.props.inputType}
                  value={this.props.value}
                  onChange={this.props.controlFunc}
                  onBlur={this.props.controlFunc}
                  placeholder={this.props.placeholder}
                  aria-invalid={!this.props.valid}
              />
              {this.props.labelAfter? this.renderLabel() : null}


              <InputError msgs={this.props.msgs}/>


          </div>
        );
    }
}


//property type checking
SingleInput.propTypes = {
    inputType: PropTypes.oneOf(['text', 'number', 'password', 'email']).isRequired,
    labelAfter: PropTypes.bool,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    placeholder: PropTypes.string,
    controlFunc: PropTypes.func.isRequired,
    validation: PropTypes.object

};



export default SingleInput;