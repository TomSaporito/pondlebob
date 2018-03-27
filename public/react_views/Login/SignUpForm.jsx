import React, {Component} from 'react'; //react
export default function (props) {
    return (

    <form id="signup" name="signup" action="/signup" method="post" onSubmit={props.signup} className="collapse js-login-toggle">
        <div className="row">
            <div className="col-12">
                <h2>
                    Signup
                </h2>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="signupEmail">
                        Email:
                            </label>
                    <input required className="form-control" id="signupEmail" name="signupEmail" type="email" />

                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="nickname">
                        Nickname:
                                <br /><strong>This is how other users will identify you</strong>
                    </label>
                    <input required className="form-control" id="nickname" name="nickname" type="text" />

                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="signupPassword">
                        Password:
                            </label>
                    <input required className="form-control" id="signupPassword" name="signupPassword" type="password" />

                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="confirmPassword">
                        Confirm Password:
                            </label>
                    <input required className="form-control" id="confirmPassword" name="confirmPassword" type="password" />

                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                <div>
                    <button className="btn btn-success" type="submit">
                        Sign Up
                    </button>
                </div>
                <a href=".js-login-toggle" data-toggle="collapse">
                    Already a member?  Log in!!
                </a>
            </div>
        </div>
    </form>
    )}