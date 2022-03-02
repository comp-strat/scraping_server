import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Jobs from "./pages/Jobs.js";
import NewJob from "./pages/NewJob.js";
import Job from "./pages/Job.js";
import Home from "./pages/Home.js";

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
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/new-job" element={<NewJob />} />
          <Route exact path="/jobs" element={<Job />} />
          <Route exact path="/job/:id" element={<Job />} />
          {/* <Route exact path="/viewDataset" component={ViewDataset} />
                    <Route exact path="/datasets" component={Datasets} />
                     <Route exact path="/dashboard" component={DashboardStyled} /> */}
                    
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
