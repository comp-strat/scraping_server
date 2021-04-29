import React, { Component } from "react";
import { Box, Grid, Typography } from '@material-ui/core';
import {Copyright, LeftDrawer} from '../components/Components.js'
import {pesudoJobs} from '../data/pesudoData.js'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import pranav from '../static/img/pranav.png';
import charlotte from '../static/img/Charlotte.jpg'
import {DatasetDetailPath} from '../components/Components.js'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  exampleCardStyle: {
    maxWidth: 300,
  },

  exampleCardImageStyle: {
    height: 150,
  },

  main: {
    flexGrow: 1,
  },

  datasets: {
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(8),
    paddingLeft: theme.spacing(8),
  },

}));

function Title(props) {
  return (
    <Typography component="h2" variant="h4" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

const handleDatasetCardClick = (props, id) => {
  props.history.push({
    pathname: DatasetDetailPath,
    search: '?id=' + id,
  });
}

function Samples(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title  children="Datasets" />
      <Grid
        container
        justify="space-evenly"
        spacing={3}
        className={classes.datasets}
      >
        {pesudoJobs.map((job) => {
          return (
            <Grid item xs={2} md={3} sm={6} key={job.id}>
              <Card className={classes.exampleCardStyle}>
              <CardHeader
                avatar={<Avatar src={pranav} />}
                action={
                  <IconButton>
                    <ShareIcon />
                  </IconButton>
                }
                title={job.creator}
                subheader={job.date}
              />
                <CardMedia
                  className={classes.exampleCardImageStyle}
                  image={charlotte}
                  title={job.ticket}
                />
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {job.ticket}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleDatasetCardClick(props, job.id)}
                  >
                    VIEW
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  )
}

export function DatasetPage(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <LeftDrawer history={props.history}/>
      <main className={classes.main}>
        <Samples history={props.history}/>
        <Box pt={4}>
          <Copyright />
        </Box>
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
      <DatasetPage history={this.props.history}/>
    )
  }
}

export default Datasets;