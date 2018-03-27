import React from 'react';

//const Home = ({nickname}) => {
//                 return(
//                    <div>
//                        Hello, {nickname || "dude"}
//                    </div>
//                 );
//             }
//
//             export default Home;

export default class Home extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                Hello, {this.props.nickname || "dude"}
            </div>
        );
    }
}