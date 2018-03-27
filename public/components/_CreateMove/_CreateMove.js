import React from 'react';


//
//import custom components

import SelectBox from '../_SelectBox/_SelectBox';

export default class CreateMove extends React.Component{
    constructor(props){
        super(props);

        this.pickNameOne = this.pickNameOne.bind(this);
        this.pickNameTwo = this.pickNameTwo.bind(this);
    }

    pickNameOne(){

    }

    pickNameTwo(){

    }

    render(){
        return (
            <create-move>
                <div className="row flex-md-row-reverse">
                    <div className="col-md-6">
                        Output
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-6">
                                <SelectBox name="moveName1A"
                                           placeholder="Select One"
                                           controlFunc={this.pickNameOne}
                                           label="Move Part One"
                                           options={this.props.moveNames || []}/>
                            </div>
                            <div className="col-md-6">
                                <SelectBox name="moveName1B"
                                           placeholder="Select One"
                                           controlFunc={this.pickNameTwo}
                                           label="Move Part Two"
                                           options={this.props.moveNames || []}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row flex-md-row-reverse">
                    <div className="col-md-6">
                        Animation
                    </div>
                    <div className="col-md-6">
                    </div>
                </div>
            </create-move>
        );
    }
}