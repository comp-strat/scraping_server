

import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Jobs from './pages/Jobs.js'
import Datasets from './pages/Datasets.js'
import Dashboard from './pages/Dashboard.js'

// import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
        };
    }

    render() {
        return (
            <Router>
                <div className="container">
                    <Switch>
                        <Route exact path="/jobs" component={Jobs} />
                        <Route exact path="/datasets" component={Datasets} />
                        <Route exact path="/dashboard" component={Dashboard} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;
