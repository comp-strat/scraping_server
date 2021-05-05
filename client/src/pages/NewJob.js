import React, { Component } from "react";
import {LeftDrawer, Copyright} from '../components/Components.js'
import { makeStyles } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) =>({
  root: {
    display: 'flex',
  },

  main: {
    flexGrow: 1,
  },

  textInput: {
    padding: 15
  },

  input: {
    display: 'none',
  },

}));

function NewJobContent(props) {
  const classes = useStyles();
  return (
    <div>
      <Grid
        container
        justify='center'
        alignItems="stretch"
        spacing={2}
      >
        <Grid item xs={5} />
        <Grid item xs={2}>
          <Paper component="form">
            <TextField
              placeholder="urls"
              helperText="Seperated by comma"
              margin="normal"
              variant="outlined"
              multiline
              rows={3}
              rowsMax={4}
              style={{ margin: 8 }}
            />
          </Paper>
        </Grid>
        <Grid item xs={5} />
        <Grid item xs={5} />
        <Grid item xs={2}>
          <input
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>
        </Grid>
        <Grid item xs={5} />
      </Grid>
    </div>
  )
}

function NewJobPage(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <LeftDrawer history={props.history}/>
      <main className={classes.main}>
        <NewJobContent />
        <Box pt={4}>
          <Copyright />
        </Box>
      </main>
    </div>
  )
}

class NewJob extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NewJobPage history={this.props.history}/>
    )
  }
}

export default NewJob;