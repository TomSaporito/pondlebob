import React from 'react';
import { Link } from 'react-router-dom';


export default class NavBar extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/home">Pondlebob</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/home">Home <span className="sr-only">(current)</span></Link>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {this.props.nickname || "Profile"}
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                                <Link className="dropdown-item" to="/lineup">Lineup</Link>

                                <Link className="dropdown-item" to="/settings">Settings</Link>

                                <div className="dropdown-divider"></div>
                                <a href="/logout" className="dropdown-item" id="logout">
                                    Logout
                                </a>
                            </div>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/duel">Duel</Link>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Find Friends..." aria-label="Find Friends"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>

            </nav>

        );
    }
}