import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './home/Home.js'
import Results from './home/Results.js'

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
            <Route exact path="/results" component={Results} />
          </Switch>
        </div>
      </Router>
    )  
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);