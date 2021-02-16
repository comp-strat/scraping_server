import React, { Component } from "react";
import { render } from "react-dom";
import Home from './home/Home.js'

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
      <Home/>
    )  
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);