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


/*==================== Firebase Setup ====================*/
var config = {
  apiKey: "AIzaSyC6IXRnUFoLq6effu-oOowAnISefT47Kyk",
  authDomain: "fit-fin-183317.firebaseapp.com",
  databaseURL: "https://fit-fin-183317.firebaseio.com",
  projectId: "fit-fin-183317",
  storageBucket: "fit-fin-183317.appspot.com",
  messagingSenderId: "890661902760"
};
firebase.initializeApp(config);




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

    /*==================== Login Functions ====================*/
    clickLogin = () => {
        const email = document.getElementById("input-email").value;
        const password = document.getElementById("input-password").value;
        const auth = firebase.auth();

        // Sign in
        const loginPromise = auth.signInWithEmailAndPassword(email, password);

        // Listen for callback errors
        loginPromise.catch(e => console.log(e.message));

        /*this.setState({
            userId: firebase.auth()
        })*/

        /*console.log(firebase.auth());*/
    }
    clickSignup = () => {
        // TODO: validate email
        const email = document.getElementById("input-email").value;
        const password = document.getElementById("input-password").value;
        const auth = firebase.auth();

        console.log("email");
        console.log("password");

        // Sign in
        const loginPromise = auth.createUserWithEmailAndPassword(email, password);

        // Listen for callback errors
        loginPromise
            .then(user => console.log(user))
            .catch(e => console.log(e.message));

        // Realtime login listener
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                /*console.log(firebaseUser);*/
                this.setState ({ loggedIn: true })
            } else {
                /*console.log('not logged in');*/
                this.setState ({ loggedIn: false })
            }
        })
    }
    clickLogout = () => {
        console.log("LOG OUT");
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
    ConfigureRoutes = (props) => {
        const loggedIn = this.props.loggedIn;

        if (loggedIn) {
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
        } else {
            return (
                <Switch>
                    <Route path="/scene" component={VrScenePage} />
                    <Route path="/" component={DashboardPage} />
                </Switch>
            );
        }
    }

    render() {
        return (
            <Router>
                <this.ConfigureRoutes loggedIn={this.state.loggedIn} />
            </Router>
        );
    }
}

ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));
