import React, { Component } from "react";
import { Grid, Typography } from '@material-ui/core';
import {LeftDrawer} from './Componenets.js'
import {pesudoJobs} from './pesudoData.js'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },

  exampleCardStyle: {
    maxWidth: 500,
  },

  exampleCardImageStyle: {
    height: 200,
  },

  main: {
    flexGrow: 1,
  }

});

function Samples(props) {
  const classes = useStyles();
  return (
    <Grid container justify="space-evenly" spacing={3}>
      {pesudoJobs.map((job) => {
        return (
          <Grid item xs={3} key={job.id}>
            <Card className={classes.exampleCardStyle}>
              <CardMedia
                className={classes.exampleCardImageStyle}
                image="/static/imgs/Charlotte.jpg"
                title={job.ticket}
              />
              <CardContent>
                <Typography
                  style={{fontSize: 12}}
                  color="textSecondary"
                  gutterBottom
                >
                  {job.date}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  {job.ticket}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" component="p">
                  {job.creator}
                </Typography>
              </CardContent>
              <CardActions>
                <Button color="primary">VIEW</Button>
                <Button color="primary">EDIT</Button>
                <IconButton>
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  )
}

export function DatasetPage(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <LeftDrawer />
      <main className={classes.main}>
        <Samples />
      </main>
    </div>
  )
}

class Datasets extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DatasetPage />
    )
  }
}

export default Datasets;