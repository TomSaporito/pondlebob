/**
 * Created by root on 7/12/17.
 */
import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

//import custom components
import InputError from '../_InputError/_InputError.js';


/*

REQUIRED
    @prop showLegend        {boolean}   do we show the legend text
    @prop legend            {string}    text for the legend
    @prop setName           {string}    string for the name of the input group
    @prop controlFunc       {function}  function for the change handler
    @prop type              {string}    'checkbox' or 'radio'
    @prop options           {[*]}       an array of options for the cbs or radio btns

OPTIONAL
    @prop selectedOptions   {[number]}  index of selected inputs
    @prop inline            {boolean}   should the checkboxes/radio btns be inline
    @prop validateFunction  {function}  function to hit when on blur is triggered
    @prop required          {boolean}   is input required



*/

class CheckboxOrRadioGroup extends React.Component{
    constructor(props){
        super(props);
    }

    render(){

        //their validation does not work
        return (
            <fieldset>
                <legend className={this.props.showLegend? '': 'sr-only'}>
                    {this.props.legend}
                </legend>
                {this.props.options.map((opt)=> {
                    return(
                        <div className={'form-check '+  (this.props.touched === true && this.props.valid === false? 'has-error' : '') + (this.props.inline? ' form-check-inline': '')} key={opt}>
                            <input name={this.props.setName}
                                   onChange={this.props.controlFunc}
                                   onBlur={this.props.validateFunc}
                                   value={opt}
                                   id={`${opt}-${this.props.setName}`}
                                   checked={this.props.selectedOptions.indexOf(opt) > -1}
                                   type={this.props.type}
                             />
                            <label htmlFor={`${opt}-${this.props.setName}`}>
                                {opt}
                            </label>
                        </div>
                    );
                })}
                <InputError msgs={this.props.msgs}/>
            </fieldset>
        );
    }
}


CheckboxOrRadioGroup.propTypes = {
    showLegend: PropTypes.bool.isRequired,
    legend: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['checkbox', 'radio']).isRequired,
    setName: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    controlFunc: PropTypes.func.isRequired,

    selectedOptions: PropTypes.array,
    validateFunc: PropTypes.func,
    inline: PropTypes.bool
};

export default CheckboxOrRadioGroup;