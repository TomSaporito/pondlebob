/**
 * Created by root on 7/18/17.
 */
import React from 'react';
import PropTypes from 'prop-types';



/*
    @requires
        'react',
        'prop-types'

    @description
        displays form errors based on the error msgs within the msg prop

    @prop msgs  {[string]}  array of error messages to show client
*/
export default class InputError extends React.Component{

    constructor(props){
        super(props);

    }

    renderErrors(){
        return (


                <ul className="list-unstyled">
                    {this.props.msgs? this.props.msgs.map((msg, index)=> {
                        if ( this.props.msgs.length > 0 ) {
                            return (<li key={`warning-msg-${index}`}>{msg}</li>);
                        } else {

                        }
                    }) : null}
                </ul>


        );
    }


    render(){
        return(
            <div className="invalid-feedback" role="alert">
                {this.props.msgs? (this.props.msgs.length>0? this.renderErrors(): null) : null}
            </div>
        );
    }


}