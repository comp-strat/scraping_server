import React, { Component } from "react";
import { Grid, Typography } from '@material-ui/core';
import render from "react-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const instructionGridStyle = {
  width: "80%",
};

const paperStyle = {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 600,
};

const uploadButtonStyle = {
  padding: '5px 5px',
  width: 150,
  alignItems: 'center',
};

const exampleCardStyle = {
  maxWidth: 300,
};

const exampleCardImageStyle = {
  height: 240,
};

function Search(props) {
  return (
    <Grid 
      container
      direction='row'
      justify='center'
      style={{padding: 15}}
    >
      <Paper
        component="form"
        elevation={4}
        style={paperStyle}
      >
        <InputBase
          placeholder="Input URL here"
          fullWidth={true}
        />
        <IconButton type="submit" aria-label="search" color="primary">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Grid>
  );
}

function TopBar(props) {
  return (
    <AppBar position="static">
      <Toolbar variant="regular">
        <Typography variant="h6" color="inherit">
          Universal Web Crawler
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

function Headline(props) {
  return (
    <Grid container justify='center'>
      <Typography variant="h3" component="h2" color="secondary">
        Explore structured chapter school information
      </Typography>
    </Grid>
  );
}

function CenterInstruction(props) {
  return (
    <Grid container justify="center" style={{padding: 50}}>
      <Grid
        container
        style={instructionGridStyle}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Typography variant="h5" component="p" color="textPrimary">
          Type single url or multiple urls separated 
          by comma. The input could also be a uploaded csv file.
        </Typography>
      </Grid>
    </Grid>
  );
}

function ExampleInstruction(props) {
  return (
    <Grid container justify="center" style={{padding: 50}}>
      <Grid
        container
        style={instructionGridStyle}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Typography variant="h5" component="p" color="textPrimary">
          You can begin with the following examples
        </Typography>
      </Grid>
    </Grid>    
  );
}

function UploadButton(props) {
  return (
    <Grid container justify='center'>
      <Button
        variant="contained"
        color="default"
        startIcon={<CloudUploadIcon />}
        style={uploadButtonStyle}
      >
        Upload CSV
      </Button>
    </Grid>
  );
}

function Examples(props) {
  const examples = [
    {title: 'Charlotte', img: '/static/imgs/Charlotte.jpg'},
    {title: 'socratesacademy', img: '/static/imgs/socratesacademy.jpg'}
  ];
  return (
    <Grid container justify='center' spacing={6}>
      <Grid item>
        <Card style={exampleCardStyle}>
          <CardMedia
            style={exampleCardImageStyle}
            image="/static/imgs/Charlotte.jpg"
            title="Charlotte"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Charlotte
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              http://www.charlottesecondary.org/ 
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined" size="small" color="primary">
              Search
            </Button>
          </CardActions>
        </Card>
      </ Grid>
      <Grid item>
        <Card style={exampleCardStyle}>
          <CardMedia
            style={exampleCardImageStyle}
            image="/static/imgs/Socratesacademy.jpg"
            title="Socratesacademy"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Charlotte
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            http://www.socratesacademy.us/ 
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined" size="small" color="primary">
              Search
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

function GridContainer(props) {
  return (
    <Grid>
      <Grid>
        <TopBar />
      </Grid>
      <Grid container style={{padding: 50}}>
        <Headline />
        <CenterInstruction />
        <Search />
        <UploadButton />
        <ExampleInstruction />
        <Examples />
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
        <main><GridContainer/></main>
      </React.Fragment>
    )
  }
}

export default Home;