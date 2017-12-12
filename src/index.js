import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import Dashboard from './components/dashboard/dashboard.js'
import VrScenePage from './components/vrScene/vrScene.js'


class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/scene" component={VrScenePage} />
                    <Route path="/" component={Dashboard} />
                </Switch>
            </Router>
        );
    }
}

ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));
