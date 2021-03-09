import {TopBar, largerSchoolExamples} from './Components.js'
import React, { Component } from "react";
import { Grid, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    overflow: 'auto',
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
  }
}));

function Headline(props) {
  return (
    <Grid container justify='flex-start' style={{marginBottom: 10}}>
      <Typography variant="h5" component="p" color="primary">
        Crawled Results:
      </Typography>
    </Grid>
  );
}

function PaperList(props) {
  const classes = useStyles();

  return (
    <Paper variant="outlined" style={{height: '60vh', width: '30%'}}>
      <List className={classes.root} >
        {largerSchoolExamples.map((example, index) =>
          <ListItem
            button
            key={example.ncessch}
            alignItems="flex-start"
            divider
          >
            <ListItemText
              primary={example.url}
              secondary={example.ncessch}
            />
          </ListItem>
        )}
      </List>
    </Paper>
  );
}

function GridContainer(props) {
  return (
    <Grid>
      <Grid>
        <TopBar />
      </Grid>
      <Grid container style={{padding: 20}} >
        <Headline />
        <PaperList />
      </Grid>
    </Grid>
  )
}

class Results extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <main><GridContainer /></main>
      </React.Fragment>
    )
  }
}

export default Results;