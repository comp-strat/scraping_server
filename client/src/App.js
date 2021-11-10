import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Jobs from './pages/Jobs.js'
import Datasets from './pages/Datasets.js'
import Dashboard from './pages/Dashboard.js'
import ViewDataset from "./pages/ViewDataset";
import CreateNewJob from "./pages/NewJob";
import Job from './pages/Job.js'
import Home from './pages/Home.js'

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
                        <Route exact path="/" component={Home} />
                        <Route exact path="/viewDataset" component={ViewDataset} />
                        <Route exact path="/jobs" component={Jobs} />
                        <Route exact path="/job/:id" component={Job} />
                        <Route exact path="/datasets" component={Datasets} />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/new-job" component={CreateNewJob} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;
