import React from 'react';



//import custom components
import DrawableCanvas from '../../components/_DrawableCanvas/_DrawableCanvas.js';

export default class DrawPondlebob extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <h2>
                    Draw Your Pondlebob!
                </h2>
                <p className="small">
                    Use the toolkit below to draw your own creature!
                </p>


                <DrawableCanvas canvasId="canvasOne" mouseE={this.props.swipeOff} mouseL={this.props.swipeOn}/>
            </div>
        );

    }
}

