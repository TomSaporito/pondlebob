/**
 * Created by root on 6/26/17.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

//import custom components
import InputError from '../_InputError/_InputError.js';



/*

REQUIRED
    @prop name           {string}   name of select and id
    @prop controlFunc    {function} function for the change handler
    @prop label          {string}   text in label
    @prop options        {[*]}      an array of options for the cbs or radio btns

OPTIONAL
    @prop selectedOption    {string}    value of the default selected
    @prop validateFunction  {function}  function to hit when on blur is triggered
    @prop required          {boolean}   is input required
    @prop placeholder       {string}    default value

VALIDATION
    @props touched  {bool}      has the input been touched yet?
    @props msgs     {[string]}  error messages or success messages
    @props valid    {bool}      is the input valid?

*/

class Select extends React.Component{
    constructor(props){
        super(props)
    }

    render(){


        return (
            <div className="form-group">
                <label htmlFor={this.props.name}>
                    {this.props.label}
                </label>

                <select
                    className={`form-control ${this.props.touched? (this.props.valid? 'is-valid' : 'is-invalid') : ''}`}
                    name={this.props.name}
                    value={this.props.selectedOption}
                    onChange={this.props.controlFunc}
                    onBlur={this.props.controlFunc}
                    required={this.props.required}
                >
                    <option value="">{this.props.placeholder}</option>
                    {this.props.options? (this.props.options.map(opt => {
                        return (
                            <option
                                key={opt}
                                value={opt}>
                                {opt}
                            </option>
                        );
                    })):null}
                </select>


                <InputError msgs={this.props.msgs}/>
            </div>
        );

    }
}


Select.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    selectedOption: PropTypes.string,
    controlFunc: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string.isRequired
};

export default Select;