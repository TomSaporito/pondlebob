import React from 'react';

//
//custom components
import SortableLineup from '../../components/_SortableLineup/_SortableLineup.js';
import CreatePondlebob from '../../components/_CreatePondlebob/_CreatePondlebob.js';

export default class Lineup extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div id="lineup-view">
                <a href="#your-lineup" data-toggle="collapse">
                    Your lineup
                </a>
                <div id="your-lineup" className="collapse">
                    <SortableLineup  data={this.props.data}/>
                </div>

                <CreatePondlebob token={this.props.token}/>
            </div>

        );

    }

};

