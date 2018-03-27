import React, { Component } from 'react';//react
import { appState } from '../appState';//State management singleton
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';



export default class Login extends Component {
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
    }

    componentDidMount(){
        appState.$emit('HIDE_LOADER');//hide the loader when the component mounts
    }

    login(e){
        e.preventDefault();
        appState.$emit('SHOW_LOADER');
        fetch('/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: document.getElementById('email').value, 
                password: document.getElementById('password').value,
                rememberMe: document.getElementById('rememberMe').checked? document.getElementById('rememberMe').value: null
            })
        }).then((res)=>{
            return res.json();
        }).then((data) => { 
            console.log(data)
            if(data.loggedIn){
                console.log('LOGIN SUCCESS');
                appState.$emit('UPDATE_STATE', data);
            } else {
                console.log('LOGIN FAILED');
                appState.$emit('UPDATE_STATE', data);
            }
        
          });
    }

    signup(e){
        e.preventDefault();
        appState.$emit('SHOW_LOADER');//show the loader while we process this sign up
        fetch('/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: document.getElementById('signupEmail').value, //email
                password: document.getElementById('signupPassword').value, //signup 
                confirmPassword:  document.getElementById('confirmPassword').value,//confirm password
                nickname:  document.getElementById('nickname').value//user nickname
            })
        }).then((res)=>{
            return res.json();//handle json response
        }).then((data) => { 
            console.log(data);
            if(data.emailSent){//expecting this response from server
                console.log('SIGNUP SUCCESS');
                appState.$emit('UPDATE_STATE', data);
            } else {
                console.log('SIGNUP FAILED');
                appState.$emit('UPDATE_STATE', data);
            }
        
          })
          .catch(function(err){
              console.log('caught ', err);
          });
    }

    render(){
        return(
            <div className="container">
                <LoginForm login={this.login}/>
                <SignUpForm signup={this.signup}/>     
            </div>
        )
    }
}