import React, { Component } from 'react';//react
export default function (props) {
    return (

        <form id="login" name="login" onSubmit={props.login} className="collapse show js-login-toggle" action="/login" method="post">
            <div className="row">
                <div className="col-12">
                    <h2>
                        Login
                </h2>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="email">
                            Email:
                    </label>
                        <input required className="form-control" id="email" name="email" type="email" />

                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="password">
                            Password:
                    </label>
                        <input required className="form-control" id="password" name="password" type="password" />

                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="form-check">
                        <input type="checkbox" name="rememberMe" className="form-check-input" id="rememberMe" />
                        <label value="true" className="form-check-label" htmlFor="rememberMe">Remember Me</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div>
                        <button className="btn btn-success">
                            Login
                    </button>
                    </div>
                    <a href=".js-login-toggle" data-toggle="collapse">
                        Not a member?  Sign Up!!
                </a>
                </div>
            </div>
        </form>
    )
};