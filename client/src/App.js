import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JobsDashboard from "./pages/JobsDashboard.js";
import NewJob from "./pages/NewJob.js";
import Job from "./pages/Job.js";
import Home from "./pages/Home.js";
import ResponsiveAppBar from "./components/Navbar";
import theme from "./styles/Theme";
import {ThemeProvider} from "@mui/system";

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
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/new-job" element={<NewJob />} />
            <Route exact path="/jobs" element={<JobsDashboard />} />
            <Route exact path="/job/:id" element={<Job />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default App;
