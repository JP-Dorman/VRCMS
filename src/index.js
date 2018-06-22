import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import DashboardPage from './components/dashboard/dashboard.js'
import VrScenePage from './components/vrScene/vrScene.js'
import LoginPage from './components/login/login.js'
import * as firebase from 'firebase';
import './firebaseAuth.js';






class App extends React.Component {
    /*==================== State ====================*/
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            inputEmail: "",
            inputPassword: "",
            userId: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount = () => {
        // Realtime login listener
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                this.setState ({
                    loggedIn: true,
                    userId: firebaseUser.uid
                })
            } else {
                this.setState ({ loggedIn: false })
            }
        });
    }

    /*==================== Login Functions ====================*/
    clickLogin = () => {
        const email = document.getElementById("input-email").value;
        const password = document.getElementById("input-password").value;
        const auth = firebase.auth();

        // Sign in
        const loginPromise = auth.signInWithEmailAndPassword(email, password);

        // Listen for callback errors
        loginPromise.catch(e => console.log(e.message));
    }

    clickSignup = () => {
        // TODO: validate email
        const email = document.getElementById("input-email").value;
        const password = document.getElementById("input-password").value;
        const auth = firebase.auth();

        // Sign in
        const loginPromise = auth.createUserWithEmailAndPassword(email, password);

        // Listen for callback errors
        loginPromise
            .then(user => console.log(user))
            .catch(e => console.log(e.message));
    }

    clickLogout = () => {
        firebase.auth().signOut();
    }

    handleInputChange = (event) => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    }

    /*==================== Route Configurations ====================*/
    ConfigureRoutes = () => {
        const loggedIn = this.state.loggedIn;

        if (loggedIn) {
            return (
                <Switch>
                    <Route path="/scene"
                        render={(routeProps) => (
                            <VrScenePage {...routeProps} userId={this.state.userId} />
                        )}
                    />
                    <Route path="/"
                        render={(routeProps) => (
                            <DashboardPage {...routeProps} userId={this.state.userId} />
                        )}
                    />
                </Switch>
            );
        } else {
            return (
                <Switch>
                    <Route path="/"
                        render={(routeProps) => (
                            <LoginPage
                                {...routeProps}
                                loggedIn={ this.state.loggedIn }
                                inputEmail={this.state.inputEmail}
                                inputPassword={this.state.inputPassword}
                                handleInputChange={this.handleInputChange}
                                clickLogin={ this.clickLogin }
                                clickSignup={ this.clickSignup }
                                clickLogout={ this.clickLogout }
                            />
                         )}
                    />
                </Switch>
            );
        }
    }

    render() {
        return (
            <Router>
                <this.ConfigureRoutes />
            </Router>
        );
    }
}

ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));
