import React, { Component } from "react";
import { Grid, Typography } from '@material-ui/core';
import render from "react-dom";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

function Search(props) {
  return (
    <Paper elevation={5} component="form">
      <InputBase/>
    </Paper>
  );
}

function GridContainer(props) {
  return (
    <Grid>
      <Grid container justify='center'>
        <Typography variant="h2" component="h2" color="secondary">
          Crawler
        </Typography>
      </Grid>
      <Grid container justify='center'>
        <Search />
      </Grid>
    </Grid>
  )
}

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <main>
        <GridContainer/>
        </main>
      </React.Fragment>
    )
  }
}

export default Home;