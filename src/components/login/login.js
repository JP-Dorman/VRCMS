import React from 'react';
import './login.css'
import axios from 'axios';
import * as firebase from 'firebase';


class DashboardPage extends React.Component {
    render() {
        const logInOutClass = this.props.loggedIn === false ? "logged-out" : "logged-in"

        return (
            <div id="login-page">
                <div id="login-card" className={"card " + logInOutClass}>
                    {/*=== Email ===*/}
                    <label>
                    <span>Email:</span>
                    <input id="input-email" name="inputEmail" type="email" value={this.props.inputEmail} onChange={this.props.handleInputChange} placeholder="Email.." />
                    </label>

                    {/*=== Password ===*/}
                    <label>
                    <span>Password:</span>
                    <input id="input-password" name="inputPassword" type="password" value={this.props.inputPassword} onChange={this.props.handleInputChange} placeholder="Password.." />
                    </label>

                    <div className="button-container">
                        <button id="log-in" className="btn btn-primary" onClick={this.props.clickLogin}>Login</button>
                        <button id="log-out" className="btn btn-primary" onClick={this.props.clickLogout}>Log Out</button>
                        <button id="sign-up" className="btn" onClick={this.props.clickSignup}>Sign Up</button>
                    </div>
                </div>
            </div>
        );
    };
}

export default DashboardPage;
































/**/
