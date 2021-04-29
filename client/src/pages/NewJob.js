import React, { Component } from "react";
import {LeftDrawer, Copyright} from '../components/Components.js'
import { makeStyles } from "@material-ui/core";
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) =>({
  root: {
    display: 'flex',
  },

  main: {
    flexGrow: 1,
  }

}));

function NewJobContent(props) {
  return (
    <div />
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