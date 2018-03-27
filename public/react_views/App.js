import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Redirect } from 'react-router-dom';
import { appState } from './appState';

import Login from './/Login/Login';


//regular DOM manipulation
appState.$on('HIDE_LOADER', function(){
    document.getElementById('full-page-loader').classList.remove('drop-in','loading');
});

appState.$on('SHOW_LOADER', function(){
    document.getElementById('full-page-loader').classList.add('drop-in','loading');
});
// import Loader from '../components/_Loader/_Loader';


// componentDidMount(){
//     var that = this;

//     window.history.pushState({path:this.href},'','home');

//     fetch("home/api/user", {
//         method: "GET",
//         headers: {
//             bearer: this.token            }
//     })
//     .then(function(res){ return res.json(); })
//     .then(function(data){
//             console.log(data);
//         that.setState({nickname: data.nickname, needLineup: data.needLineUp, duels: data.duels});

//     });
// }

//
//import components
// appState.$on('STATE_UPDATED', function(s){console.log(s)});

import NavBar from '../components/_NavBar/_NavBar.js';
import MyRouter from '../components/_Router/_Router.js';




export default class App extends React.Component {

    constructor(props){
        super(props);
          
        this.hideLoader = this.hideLoader.bind(this);
        this.renderApp = this.renderApp.bind(this);
        this.login = this.login.bind(this);
        
        
        this.state = {
            nickname: 'Default_Name',
            needLineUp: false,
            duels: null
        };

      
        appState.$on('LOGIN_FAIL', this.UPDATE.bind(this));
        // appState.$on('INIT_APP', this.renderApp.bind(this));
        appState.$on('LOGIN_SUCCESS', this.login.bind(this));
        
        
    }

    UPDATE(s){
        // console.log('in update');
        this.setState(s, function(){
            console.log(this.state);
            this.hideLoader();
        });
    }

    login(s){
        console.log(s);
        this.setState(s, function(){
            if(this.state.rememberMe){
                window.localStorage.setItem('pondlebobToken', this.state.apiToken);
            }
            console.log('LOGGED IN', this.state);
        });

    }

    hideLoader(){
        appState.$emit('UPDATE_STATE', {$type: 'HIDE_LOADER'});
    }

    showLoader(){
        appState.$emit('UPDATE_STATE', {$type: 'SHOW_LOADER'});
    }

    // renderApp(state){
    //     // console.log(state);
    //     if(state.apiToken){
    //         fetch("/api", {
    //             method: "GET",
    //             headers: {
    //                 bearer: state.apiToken
    //             }
    //         })
    //         .then((res)=>{
    //             // console.log(res);
    //             if(res.status === 401){
    //                 //unauthorized
    //                 //sign up, login
    //                 this.hideLoader();
    //             } else {
    //                 //we have the right permissions
    //                 res.json();
    //                 this.hideLoader();
    //             }
    //         })
    //         .then(function(data) {
    //             //Render the app beyond login and sign up
    //             console.log('I got here')

    //         }).catch(()=> {
    //             //fetch completely failed
    //             this.hideLoader();
    //         });
    //     } else {
    //         //no token
    //         //sign up, login
    //         this.hideLoader();
            
            
    //     }
    // }

    renderApp(){
        console.log('returning app');
        return (
            <MyRouter/>    
        );
    }
    renderLogin(){
        return(
            <Login/>
        );
    }

    getToken(){
        console.log('getting token')
        return window.localStorage.getItem('pondlebobToken');
    }

    handleReload(){
        console.log('handling login');
        return this.getToken()? this.fetchUser(this.getToken()) : this.renderLogin();
    }

    fetchUser(token){
        console.log(token);
        var self = this;
        
        fetch("/api/user", {
            method: "GET",
            headers: {
                bearer: token
            }
        })
        .then((res)=>{
            // console.log(res);
            if(res.status === 401){
                //unauthorized
                //sign up, login
                this.hideLoader();
            } else {
                //we have the right permissions
                return res.json();
            }
        })
        .then(function(data) {
            //Render the app beyond login and sign up
            console.log(data);
            if(data.loggedIn){
                console.log('LOGIN SUCCESS');
                appState.$emit('UPDATE_STATE', data);
            } else {
                console.log('LOGIN FAILED');
                appState.$emit('UPDATE_STATE', data);
            }

        }).catch(()=> {
            //fetch completely failed
            this.hideLoader();
        });
    }

    


    // <MyRouter token={this.token} duels={this.state.duels} nickname={this.state.nickname} />

    render() {
        return (
            <div>
                {this.state.loggedIn? this.renderApp() : this.handleReload()}
            </div>

        );
    }
}