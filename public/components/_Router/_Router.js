import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { appState } from '../../react_views/appState';

//
//custom components
import NavBar from '../_NavBar/_NavBar.js';
import Home from '../../react_views/Home/Home.js';
import Settings from '../../react_views/Settings/Settings.js';
import Duel from '../../react_views/Duel/Duel.js';
import Lineup from '../../react_views/Lineup/Lineup.js';

var list = {
  colors: [
    "Gold",
    "Crimson",
    "Hotpink",
    "Blueviolet",
    "Cornflowerblue",
    "Skyblue",
    "Aquamarine",
    "Burlywood"
  ]
};

// const MyRouter = ({nickname, duels, token}) => (
  export default class MyRouter extends React.Component{
    constructor(props){
      super(props);

    }

    componentDidMount(){
      appState.$emit('HIDE_LOADER');//helper to hide loader
    }

  render(){
    return (
      <Router>
        <div>
            <NavBar/>

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Route exact path="/home" render={(props) => <Home {...props}/>}/>
                        <Route exact path="/settings" render={(props) => <Settings {...props}/>}/>
                        <Route exact path="/duel" render={(props) => <Duel {...props}/>}/>
                        <Route exact path="/lineup" render={(props) => <Lineup {...props}/>}/>

                    </div>
                </div>
            </div>
        </div>
      </Router>
    );
  }
}



const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

// export default MyRouter;