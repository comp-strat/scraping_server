import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Jobs from './pages/Jobs.js'
import Datasets from './pages/Datasets.js'
import Dashboard from './pages/Dashboard.js'
import DatasetDetails from './pages/DatasetDetails.js'
import NewJob from './pages/NewJob.js'
import {
  JobsPath,
  DatasetsPath,
  DashboardPath,
  DatasetDetailPath,
  NewJobPath
} from './components/Components.js'

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
            <Route exact path={JobsPath} component={Jobs} />
            <Route exact path={DatasetsPath} component={Datasets} />
            <Route exact path={DashboardPath} component={Dashboard} />
            <Route exact path={DatasetDetailPath} component={DatasetDetails} />
            <Route exact path={NewJobPath} component={NewJob} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
