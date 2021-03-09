import React, { Component } from "react";
import { Grid, Typography } from '@material-ui/core';
import render from "react-dom";
import {TopBar, schoolExamples} from './Components.js'
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Autocomplete from '@material-ui/lab/Autocomplete';

const instructionGridStyle = {
  width: "80%",
};

const bottomInstructionGridStyle = {
  width: "40%",
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

const handleSearchClick = (props, keyword) => {
  const searchPath = '/results';
  props.history.push({
    pathname: searchPath,
    search: '?k=' + keyword,
  });
}

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
        <Autocomplete
          id="search"
          options={schoolExamples}
          getOptionLabel={(option) => option.url}
          style={{ width: 600 }}
          renderInput={(params) =>
            <InputBase
              ref={params.InputProps.ref}
              inputProps={params.inputProps}
              autoFocus
              label="input"
              placeholder="Input URL here"
              fullWidth={true}
            />
          }
        />
        <IconButton
          aria-label="search"
          color="primary"
          onClick={() => handleSearchClick(props, search.value)}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Grid>
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

function ButtomInstruction(props) {
  return (
    <Grid container justify="center" style={{padding: 50}}>
      <Grid
        container
        style={bottomInstructionGridStyle}
        direction="column"
        justify="center"
        alignItems="flex-start"
      >
        <Typography variant="h3" component="p" color="textPrimary">
          Instruction:
        </Typography>
        <Typography variant="h5" component="p" color="textPrimary" style={{marginTop: 20}}>
          Input a URL to start your crawling
        </Typography>
        <Typography variant="subtitle1" component="p" color="textPrimary" style={{marginTop: 10}}>
          Enter a valid chapter school URL to start your crawling. You can also select URLs from the drawdown menu.
        </Typography>
        <Typography variant="h5" component="p" color="textPrimary" style={{marginTop: 20}}>
          Crawling at scale
        </Typography>
        <Typography variant="subtitle1" component="p" color="textPrimary" style={{marginTop: 10}}>
          Not only can you crawl the results for one school, but you can also deal with a dozen of them at the same time. 
          Simply upload a CSV file that contains all the URLs that you want to deal with. 
          Remember that in the CSV file, each URL should b separated by a comma.
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
              Socratesacademy
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
        <Search history={props.history} />
        <UploadButton />
        <ExampleInstruction />
        <Examples />
        <ButtomInstruction />
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
        <main><GridContainer history={this.props.history}/></main>
      </React.Fragment>
    )
  }
}

export default Home;