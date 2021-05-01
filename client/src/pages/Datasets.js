import React, { Component } from "react";

import axios from "axios";

//Components
import {LeftDrawer} from "../components/LeftDrawer";
import {Copyright} from "../components/Copyright";

//Actions
import {handleRoutes} from "../util/handleRoutes";

// data
import {pesudoJobs} from '../data/pesudoData'


//Material UI
import { Box, Grid, Typography } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';


//images
import Avatar from '@material-ui/core/Avatar';
import pranav from '../static/img/pranav.png';
import charlotte from '../static/img/Charlotte.jpg'

// Styles
import { datasetsStyles } from "../styles/datasetsStyles";
import {Link} from "react-router-dom";



function Title(props) {
  return (
    <Typography component="h2" variant="h4" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

function Samples(props) {
  const classes = datasetsStyles();

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
                  <Button component={Link} to={'/viewDataset'} variant="outlined" color="primary">VIEW</Button>
                  <Button variant="outlined" color="primary">DOWNLOAD</Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  )
}

export function DatasetsPage(props) {
  const classes = datasetsStyles();

  return (
    <div className={classes.root}>
      <LeftDrawer history={props.history}/>
      <main className={classes.main}>
        <Samples />
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
      <DatasetsPage history={this.props.history}/>
    )
  }
}

export default Datasets;