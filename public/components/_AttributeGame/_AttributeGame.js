import React from 'react';

//
//import styles
import styles from './_AttributeGame.scss';
import ResultsList from '../_ResultsList/_ResultsList.js';

export default class AttributeGame extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            currentNumber: 1,
            currentSpin: 1,
            direction: 'up',
            spinning: false,
            spunValues: []
//            totalStatPoints:
            
        }

        this.renderButton = this.renderButton.bind(this);

        this.count = function(){
            var that = this;
//            console.log(that.state)
                        if(that.state.currentNumber == 5){
                           that.setState({currentNumber: --that.state.currentNumber, direction: 'down'});
                        } else if (that.state.currentNumber == 1){
                            that.setState({currentNumber: ++that.state.currentNumber, direction: 'up'});
                        } else {
                            if(that.state.direction == 'down') {
                                that.setState({currentNumber: --that.state.currentNumber} );
                            } else {
                                that.setState({currentNumber: ++that.state.currentNumber});

                            }
                        }

        }

        this.setSpin = this.setSpin.bind(this);
        this.addSpunValue = this.addSpunValue.bind(this);
    }

    renderButton(){
        return (
            <button disabled={this.currentSpin >3? 'disabled':false} type="button" onClick={this.setSpin}>
                Spin
            </button>
        )
    }

    addSpunValue(){
        if(!this.state.spinning){
            var that = this;
            var value = this.state.spunValues;
            value.push(this.state.currentNumber);
            this.setState({spunValues: value});

        }
    }

    setSpin(){
        var that = this;
        this.setState({spinning: !this.state.spinning}, function(){

            console.log(that.state.spinning)
            if(that.state.spinning){
                that.counterGo = setInterval(that.count.bind(that), 150);
            } else {
                clearInterval(that.counterGo);//need to fix this

                that.setState({currentSpin: ++that.state.currentSpin}, function(){
                    that.addSpunValue();
                });

            }
            //https://stackoverflow.com/questions/45862713/clearinterval-in-react
        });

    }



    render(){

        return(
            <div>
                <div className="spin-container">

                    <div className="spin-count">
                        {this.state.currentNumber}
                    </div>
                    <div className={this.state.spinning? 'go-spin': 'no-spin'}>

                    </div>

                </div>
                {this.state.currentSpin>3? null : this.renderButton()}

                <div className="spin-results">
                    Results
                    <ResultsList list={this.state.spunValues}/>
                </div>
            </div>
        );
    }
}