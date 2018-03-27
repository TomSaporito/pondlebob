import React from 'react';

export default class ResultsList extends React.Component{
    constructor(props){
        super(props);

        console.log(this.props)
    }

    render(){
        return(
            <div>
                <ol>
                                {this.props.list.map(function(item,i){
                                    return (<li key={i}>{item}</li>)
                                })}
                            </ol>
                            Total: {this.props.list.length > 1? this.props.list.reduce(function(a,b){return ((a*b)
                            .toString());
                            }): null}
            </div>
            )
    }
}